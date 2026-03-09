import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const WORKSPACE_ROOT = process.cwd();
const MESSAGE_DIR = 'messages';
const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);

// ---------------------------------------------------------------------------
// Target locales for the client CSV.
// "en" and "my" are backed by existing message files; "th" and "id" are left
// as empty placeholders for the client to fill in.
// ---------------------------------------------------------------------------
const OUTPUT_LOCALES = ['en', 'my', 'th', 'id'];
const LOCALE_LABELS = { en: 'English', my: 'Malay', th: 'Thai (to translate)', id: 'Indonesian (to translate)' };

function csvEscape(value) {
  const s = value == null ? '' : String(value);
  if (/[\n\r",]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function toClientCsv(rows) {
  // \uFEFF = UTF-8 BOM — required for Excel on Windows to correctly read multi-byte characters
  // (Malay diacritics, em dashes, etc.) without garbling.
  const BOM = '\uFEFF';
  const header = ['route', 'key', ...OUTPUT_LOCALES.map((l) => LOCALE_LABELS[l] ?? l)].map(csvEscape).join(',');
  const lines = [header];
  for (const r of rows) {
    const cells = [
      csvEscape(r.route),
      csvEscape(r.key),
      ...OUTPUT_LOCALES.map((l) => csvEscape(r[l] ?? '')),
    ];
    lines.push(cells.join(','));
  }
  return BOM + lines.join('\n') + '\n';
}

function isProbablyNonCopy(text) {
  const t = text.trim();
  if (!t) return true;

  // URLs / paths / assets
  if (/^(https?:\/\/|\/)/i.test(t)) return true;
  if (/\.(png|jpe?g|webp|svg|gif|ico|mp4|pdf)$/i.test(t)) return true;

  // Tailwind-ish / className-ish tokens
  if (/^[a-z0-9_:\-\[\]()./#]+(\s+[a-z0-9_:\-\[\]()./#]+)+$/i.test(t)) {
    // If it looks like a list of utility tokens, skip.
    // (Still allows normal sentences because they contain punctuation/casing.)
    return true;
  }

  // Pure symbols / very short tokens
  if (/^[\p{P}\p{S}]+$/u.test(t)) return true;
  if (t.length === 1) return true;

  return false;
}

function normalizeWhitespace(text) {
  return text.replaceAll(/\s+/g, ' ').trim();
}

async function listFilesRecursively(absDir) {
  /** @type {string[]} */
  const out = [];
  const entries = await fs.readdir(absDir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      // Skip common noise
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      out.push(...(await listFilesRecursively(abs)));
      continue;
    }
    out.push(abs);
  }
  return out;
}

function createSourceFile(relFile, content) {
  const ext = path.extname(relFile).toLowerCase();
  const isTsx = ext === '.tsx' || ext === '.jsx';
  const scriptKind = isTsx ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(relFile, content, ts.ScriptTarget.Latest, true, scriptKind);
}

function pageRouteFromPageFile(relFile) {
  const normalized = relFile.replaceAll('\\', '/');
  const marker = 'app/[locale]/';
  if (!normalized.startsWith(marker)) return null;
  if (!normalized.endsWith('/page.tsx') && !normalized.endsWith('/page.jsx') && !normalized.endsWith('/page.ts') && !normalized.endsWith('/page.js')) {
    return null;
  }
  const withoutPrefix = normalized.slice(marker.length);
  const withoutSuffix = withoutPrefix.replace(/\/page\.(t|j)sx?$/i, '');
  if (!withoutSuffix) return '/';
  return '/' + withoutSuffix;
}

async function pathExists(absPath) {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function resolveImport(fromAbsFile, specifier) {
  if (!specifier) return null;
  if (specifier.startsWith('next/') || specifier === 'next' || specifier.startsWith('react') || specifier.startsWith('lucide-react')) {
    return null;
  }
  if (specifier.endsWith('.css')) return null;

  let absCandidate;
  if (specifier.startsWith('@/')) {
    absCandidate = path.join(WORKSPACE_ROOT, specifier.slice(2));
  } else if (specifier.startsWith('./') || specifier.startsWith('../')) {
    absCandidate = path.resolve(path.dirname(fromAbsFile), specifier);
  } else {
    return null;
  }

  const ext = path.extname(absCandidate);
  if (ext && CODE_EXTENSIONS.has(ext.toLowerCase())) {
    return (await pathExists(absCandidate)) ? absCandidate : null;
  }

  for (const e of ['.ts', '.tsx', '.js', '.jsx']) {
    const filePath = absCandidate + e;
    if (await pathExists(filePath)) return filePath;
  }

  // directory index
  if (await pathExists(absCandidate)) {
    try {
      const st = await fs.stat(absCandidate);
      if (st.isDirectory()) {
        for (const e of ['.ts', '.tsx', '.js', '.jsx']) {
          const idx = path.join(absCandidate, 'index' + e);
          if (await pathExists(idx)) return idx;
        }
      }
    } catch {
      // ignore
    }
  }

  return null;
}

async function collectDependencyGraph(entryAbsFiles) {
  /** @type {Set<string>} */
  const visited = new Set();
  /** @type {string[]} */
  const queue = [...entryAbsFiles];

  while (queue.length) {
    const absFile = queue.pop();
    if (!absFile) continue;
    const absNorm = path.normalize(absFile);
    if (visited.has(absNorm)) continue;
    visited.add(absNorm);

    const relFile = path.relative(WORKSPACE_ROOT, absNorm);
    const ext = path.extname(relFile).toLowerCase();
    if (!CODE_EXTENSIONS.has(ext)) continue;

    let content;
    try {
      content = await fs.readFile(absNorm, 'utf8');
    } catch {
      continue;
    }
    const sourceFile = createSourceFile(relFile, content);

    const importSpecifiers = [];
    sourceFile.forEachChild((node) => {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        const ms = node.moduleSpecifier;
        if (ms && ts.isStringLiteral(ms)) {
          importSpecifiers.push(ms.text);
        }
      }
    });

    for (const specifier of importSpecifiers) {
      const resolved = await resolveImport(absNorm, specifier);
      if (resolved) queue.push(resolved);
    }
  }

  return visited;
}

function buildMetadataRanges(sourceFile) {
  /** @type {{start:number,end:number}[]} */
  const ranges = [];
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    const isExported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!isExported) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      if (decl.name.text !== 'metadata') continue;
      if (decl.initializer) {
        ranges.push({ start: decl.initializer.getStart(sourceFile), end: decl.initializer.getEnd() });
      }
    }
  });
  return ranges;
}

function isInRanges(pos, ranges) {
  for (const r of ranges) {
    if (pos >= r.start && pos <= r.end) return true;
  }
  return false;
}

function getCallCalleeId(node) {
  const expr = node.expression;
  if (ts.isIdentifier(expr)) return { kind: 'id', name: expr.text };
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
    return { kind: 'member', name: expr.expression.text, member: expr.name.text };
  }
  return null;
}

function extractFromModule(sourceFile) {
  /** @type {{ literals: string[], i18nKeys: string[] }} */
  const out = { literals: [], i18nKeys: [] };

  const metadataRanges = buildMetadataRanges(sourceFile);

  /** @type {Map<string,string>} */
  const tNamespaceByIdentifier = new Map();

  function addLiteral(text) {
    const normalized = normalizeWhitespace(text);
    if (isProbablyNonCopy(normalized)) return;
    out.literals.push(normalized);
  }

  function addKey(key) {
    const normalized = normalizeWhitespace(key);
    if (!normalized) return;
    out.i18nKeys.push(normalized);
  }

  function isVisiblePropName(name) {
    return (
      name === 'label' ||
      name === 'placeholder' ||
      name === 'title' ||
      name === 'description' ||
      name === 'heading' ||
      name === 'subheading' ||
      name === 'text'
    );
  }

  function visit(node) {
    // const t = useTranslations('Namespace')
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isCallExpression(node.initializer)) {
      const callee = node.initializer.expression;
      if (ts.isIdentifier(callee) && callee.text === 'useTranslations') {
        const arg0 = node.initializer.arguments[0];
        if (arg0 && ts.isStringLiteral(arg0)) {
          tNamespaceByIdentifier.set(node.name.text, arg0.text);
        } else {
          tNamespaceByIdentifier.set(node.name.text, '');
        }
      }
    }

    // JSX visible text
    if (ts.isJsxText(node)) {
      addLiteral(node.text);
    }

    // {'some text'} in JSX
    if (ts.isJsxExpression(node) && node.expression) {
      // Exclude expressions that are used as attribute values like className/style.
      if (ts.isJsxAttribute(node.parent)) {
        const attrName = node.parent.name.getText(sourceFile);
        if (attrName === 'className' || attrName === 'class' || attrName === 'style' || attrName === 'id') {
          // This is almost certainly not copywriting content.
          return;
        }
      }
      const e = node.expression;
      if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) {
        addLiteral(e.text);
      }
    }

    // visible string-like props in data objects, but skip SEO metadata
    if (ts.isPropertyAssignment(node)) {
      const pos = node.getStart(sourceFile);
      if (!isInRanges(pos, metadataRanges)) {
        const propName = node.name.getText(sourceFile).replaceAll(/['"]/g, '');
        const init = node.initializer;
        if ((ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) && isVisiblePropName(propName)) {
          const normalized = normalizeWhitespace(init.text);
          // Exclude common i18n-key pattern, e.g. label: 'home'
          if (propName === 'label' && /^[a-z0-9_]+$/i.test(normalized)) {
            // keep only if it doesn't look like a key
            return;
          }
          addLiteral(init.text);
        }
      }
    }

    // i18n keys usage: t('key') / t.raw('key') / t.rich('key')
    if (ts.isCallExpression(node) && node.arguments.length > 0) {
      const callee = getCallCalleeId(node);
      const arg0 = node.arguments[0];
      if (callee && (ts.isStringLiteral(arg0) || ts.isNoSubstitutionTemplateLiteral(arg0))) {
        const keyPart = arg0.text;
        const ns = tNamespaceByIdentifier.get(callee.name);
        if (ns !== undefined) {
          // Only treat known `t` vars created by useTranslations as message keys.
          const fullKey = ns ? `${ns}.${keyPart}` : keyPart;
          addKey(fullKey);
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return out;
}

function getByPath(obj, dottedKey) {
  if (!dottedKey) return undefined;
  // Supports dot paths; also accepts pre-flattened keys like foo[0].bar
  const parts = dottedKey
    .split('.')
    .flatMap((p) => {
      const out = [];
      const re = /([^\[]+)|\[(\d+)\]/g;
      let m;
      while ((m = re.exec(p))) {
        if (m[1]) out.push(m[1]);
        if (m[2]) out.push(Number(m[2]));
      }
      return out;
    });

  let cur = obj;
  for (const part of parts) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

function stringsFromValue(value) {
  /** @type {string[]} */
  const out = [];
  if (typeof value === 'string') {
    out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const v of value) out.push(...stringsFromValue(v));
    return out;
  }
  return out;
}

async function loadMessagesByLocale() {
  /** @type {Map<string, any>} */
  const map = new Map();
  const absMessagesDir = path.join(WORKSPACE_ROOT, MESSAGE_DIR);
  let entries = [];
  try {
    entries = await fs.readdir(absMessagesDir, { withFileTypes: true });
  } catch {
    return map;
  }
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.json')) continue;
    const locale = entry.name.replace(/\.json$/i, '');
    const abs = path.join(absMessagesDir, entry.name);
    const jsonText = await fs.readFile(abs, 'utf8');
    try {
      map.set(locale, JSON.parse(jsonText));
    } catch {
      // ignore invalid JSON
    }
  }
  return map;
}

async function listPageEntryFiles() {
  const absApp = path.join(WORKSPACE_ROOT, 'app');
  const all = await listFilesRecursively(absApp);
  const pages = [];
  for (const abs of all) {
    const rel = path.relative(WORKSPACE_ROOT, abs);
    const route = pageRouteFromPageFile(rel);
    if (!route) continue;
    pages.push({ abs, rel, route });
  }
  return pages;
}

async function listLayoutChainForPage(pageAbs) {
  // layout chain: app/[locale]/layout.tsx plus any nested layout.tsx in the page directory chain
  const layouts = [];
  const relPage = path.relative(WORKSPACE_ROOT, pageAbs).replaceAll('\\', '/');
  const idx = relPage.indexOf('app/[locale]/');
  if (idx !== 0) return layouts;

  const pageDirAbs = path.dirname(pageAbs);
  const localeRootAbs = path.join(WORKSPACE_ROOT, 'app', '[locale]');

  // Walk upward until locale root
  let cur = pageDirAbs;
  while (true) {
    const candidate = path.join(cur, 'layout.tsx');
    if (await pathExists(candidate)) layouts.push(candidate);
    if (path.normalize(cur) === path.normalize(localeRootAbs)) break;
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }

  // Ensure locale root layout included even if named layout.jsx/ts
  for (const e of ['layout.tsx', 'layout.ts', 'layout.jsx', 'layout.js']) {
    const rootCandidate = path.join(localeRootAbs, e);
    if (await pathExists(rootCandidate) && !layouts.includes(rootCandidate)) layouts.push(rootCandidate);
  }

  return layouts;
}

async function main() {
  const pages = await listPageEntryFiles();
  const messagesByLocale = await loadMessagesByLocale();

  // ---------------------------------------------------------------------------
  // Two global de-dup maps:
  //   i18nRows  : key  → { key, routes: Set, en, my, th, id }
  //   literalRows: normalised English text → { key: '(literal)', routes: Set, en, my:'', th:'', id:'' }
  // ---------------------------------------------------------------------------
  /** @type {Map<string, { key:string, routes:Set<string>, en:string, my:string, th:string, id:string }>} */
  const i18nRows = new Map();

  /** @type {Map<string, { key:string, routes:Set<string>, en:string, my:string, th:string, id:string }>} */
  const literalRows = new Map();

  for (const page of pages) {
    const layouts = await listLayoutChainForPage(page.abs);
    const entrypoints = [page.abs, ...layouts];
    const graph = await collectDependencyGraph(entrypoints);

    /** @type {Set<string>} */
    const literals = new Set();
    /** @type {Set<string>} */
    const i18nKeys = new Set();

    for (const absFile of graph) {
      const relFile = path.relative(WORKSPACE_ROOT, absFile);
      const ext = path.extname(relFile).toLowerCase();
      if (!CODE_EXTENSIONS.has(ext)) continue;

      let content;
      try {
        content = await fs.readFile(absFile, 'utf8');
      } catch {
        continue;
      }
      const sourceFile = createSourceFile(relFile, content);
      const extracted = extractFromModule(sourceFile);
      for (const lit of extracted.literals) literals.add(lit);
      for (const k of extracted.i18nKeys) i18nKeys.add(k);
    }

    // ---- I18n key rows -------------------------------------------------------
    for (const k of i18nKeys) {
      if (!i18nRows.has(k)) {
        // Look up each locale's translation for this key.
        const localeValues = {};
        for (const locale of OUTPUT_LOCALES) {
          const messages = messagesByLocale.get(locale);
          if (!messages) { localeValues[locale] = ''; continue; }
          const value = getByPath(messages, k);
          // For keys that resolve to arrays (e.g. feature lists), join with " | "
          const strings = stringsFromValue(value).map(normalizeWhitespace).filter((s) => !isProbablyNonCopy(s));
          localeValues[locale] = strings.join(' | ');
        }

        // Only include this key if it has at least one non-empty translation.
        const hasContent = OUTPUT_LOCALES.some((l) => localeValues[l]);
        if (!hasContent) continue;

        i18nRows.set(k, {
          key: k,
          routes: new Set([page.route]),
          en: localeValues['en'] ?? '',
          my: localeValues['my'] ?? '',
          th: localeValues['th'] ?? '',
          id: localeValues['id'] ?? '',
        });
      } else {
        i18nRows.get(k).routes.add(page.route);
      }
    }

    // ---- Hardcoded literal rows -----------------------------------------------
    for (const lit of literals) {
      if (!literalRows.has(lit)) {
        literalRows.set(lit, {
          key: '(literal)',
          routes: new Set([page.route]),
          en: lit,
          my: '',
          th: '',
          id: '',
        });
      } else {
        literalRows.get(lit).routes.add(page.route);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Build final rows list.
  // Each row: { route, key, en, my, th, id }
  // "route" is the sorted, comma-joined list of pages where the text appears.
  // ---------------------------------------------------------------------------

  /** @type {{ route:string, key:string, en:string, my:string, th:string, id:string }[]} */
  const outRows = [];

  for (const row of i18nRows.values()) {
    const sortedRoutes = [...row.routes].sort().join(', ');
    outRows.push({ route: sortedRoutes, key: row.key, en: row.en, my: row.my, th: row.th, id: row.id });
  }

  for (const row of literalRows.values()) {
    const sortedRoutes = [...row.routes].sort().join(', ');
    outRows.push({ route: sortedRoutes, key: row.key, en: row.en, my: row.my, th: row.th, id: row.id });
  }

  // Sort: i18n keys first (alphabetically by key), then literals (alphabetically by en text).
  outRows.sort((a, b) => {
    const aIsLiteral = a.key === '(literal)';
    const bIsLiteral = b.key === '(literal)';
    if (aIsLiteral !== bIsLiteral) return aIsLiteral ? 1 : -1;
    const keyCompare = a.key.localeCompare(b.key);
    if (keyCompare !== 0) return keyCompare;
    return a.en.localeCompare(b.en);
  });

  const outPath = path.join(WORKSPACE_ROOT, 'copywriting-client.csv');
  await fs.writeFile(outPath, toClientCsv(outRows), 'utf8');

  const i18nCount = i18nRows.size;
  const literalCount = literalRows.size;
  // eslint-disable-next-line no-console
  console.log(
    `Wrote copywriting-client.csv — ${i18nCount} i18n key rows + ${literalCount} hardcoded literal rows = ${outRows.length} total rows`,
  );
  // eslint-disable-next-line no-console
  console.log(`Columns: route | key | ${OUTPUT_LOCALES.map((l) => LOCALE_LABELS[l] ?? l).join(' | ')}`);
  // eslint-disable-next-line no-console
  console.log(`Note: "Thai (to translate)" and "Indonesian (to translate)" columns are empty — forward to your client to fill in.`);
}

await main();
