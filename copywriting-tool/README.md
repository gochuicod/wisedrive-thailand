# Next.js Copywriting Extractor Tool

A reusable, configurable tool for extracting copywriting from Next.js i18n projects. Supports `next-intl`, `next-i18next`, and custom i18n implementations.

## Features

✨ **Flexible Configuration** - Customize extraction rules via YAML config  
📊 **Multiple Formats** - Export to CSV and/or styled XLSX  
🎯 **Smart Detection** - Automatically infers routes and content types  
🌍 **Multi-locale Ready** - Prepared for multiple language extraction  
🎨 **Styled Output** - Professional XLSX formatting with colors and layout  
🔧 **CLI Interface** - Easy command-line usage with options  

## Installation

### Quick Setup

1. Copy the `copywriting-tool` folder to your Next.js project root
2. Install Python dependencies:

```bash
pip install -r copywriting-tool/requirements.txt
```

3. Configure for your project (edit `copywriting-tool/copywriting.config.yml`)
4. Run the extractor

### Project Structure

```
your-nextjs-project/
├── copywriting-tool/
│   ├── extractor.py           # Main extraction script
│   ├── copywriting.config.yml # Configuration file
│   ├── requirements.txt       # Python dependencies
│   ├── .gitignore            # Git ignore rules
│   └── README.md             # This file
├── messages/                 # Your i18n locale files
│   ├── en.json
│   ├── my.json
│   └── ...
└── package.json
```

## Configuration

Edit `copywriting.config.yml` to customize the extraction:

### Input Configuration

```yaml
input:
  locale_dir: messages        # Path to locale files
  locales:
    - en                      # Locales to extract
  file_pattern: '{locale}.json'  # Filename pattern
```

### Route Mapping

Map section names to routes:

```yaml
extraction:
  route_mapping:
    B2CHero: '/'
    B2BHero: '/enterprise-solutions'
    TechStack: '/enterprise-solutions'
```

### Page Types

Define which sections belong to B2C, B2B, or Global:

```yaml
extraction:
  page_types:
    global:
      - Navigation
      - Footer
    b2b:
      - B2BHero
      - TechStack
    b2c:
      - B2CHero
      - Highlights
```

### Skip Keys

Exclude certain keys from extraction:

```yaml
extraction:
  skip_keys:
    - image
    - url
    - thumbnail-path
```

## Usage

### Basic Usage

```bash
# Extract copywriting with default settings
python copywriting-tool/extractor.py

# Output: Copywriting_YYYYMMDD.csv and .xlsx
```

### Advanced Usage

```bash
# Use custom config file
python copywriting-tool/extractor.py --config my-config.yml

# Specify workspace directory
python copywriting-tool/extractor.py --workspace /path/to/project

# Output to specific directory
python copywriting-tool/extractor.py --output ./exports

# Extract specific locale
python copywriting-tool/extractor.py --locale en

# Generate only CSV
python copywriting-tool/extractor.py --format csv

# Generate only XLSX
python copywriting-tool/extractor.py --format xlsx

# Custom output prefix
python copywriting-tool/extractor.py --prefix MyProject_Copy
```

### CLI Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--config` | `-c` | Configuration file path | `copywriting.config.yml` |
| `--workspace` | `-w` | Project root directory | `.` (current) |
| `--output` | `-o` | Output directory | `.` (current) |
| `--locale` | `-l` | Locale to extract | `en` |
| `--format` | `-f` | Output format (csv/xlsx/both) | `both` |
| `--prefix` | `-p` | Output filename prefix | `Copywriting` |

## Output Format

### CSV Structure

```csv
route,page,section,content_type,key
/,b2c,B2CHero,heading,Buying a used car?
/,b2c,B2CHero,description,You deserve to know exactly...
/,b2c,B2CHero,button,Book your inspection
```

### XLSX Features

- 🎨 Styled header with brand colors
- 📏 Optimized column widths
- 🔄 Alternate row colors for readability
- ❄️ Frozen header row
- 📝 Wrapped text in description cells

### Columns

- **route** - Page path (`/`, `/enterprise-solutions`, `Global`)
- **page** - Page type (`b2c`, `b2b`, `N/A`)
- **section** - Section/component name (`B2CHero`, `Navigation`, etc.)
- **content_type** - Type of content (`heading`, `description`, `button`, etc.)
- **key** - The actual copywriting text

## Integration with Next.js

### With npm scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "extract:copy": "python copywriting-tool/extractor.py",
    "extract:copy:csv": "python copywriting-tool/extractor.py --format csv",
    "extract:copy:dev": "python copywriting-tool/extractor.py --output ./exports"
  }
}
```

Run with:
```bash
npm run extract:copy
```

### With Vercel

The tool works seamlessly with Vercel projects. Run locally before deployment or integrate into your CI/CD pipeline.

## Content Type Detection

The tool automatically detects content types based on key names:

| Pattern | Content Type |
|---------|-------------|
| `*button*`, `*btn*`, `*cta*` | `button` |
| `*heading*`, `*title*` | `heading` |
| `*subheading*`, `*subtitle*` | `subheading` |
| `*description*`, `*text*` | `description` |
| `*badge*`, `*label*` | `badge` |
| `*question*` | `faq_question` |
| `*answer*` | `faq_answer` |
| `*placeholder*` | `placeholder` |
| `*highlighted*` | `highlighted_word` |

## Examples

### Example 1: Extract for Translation

```bash
# Extract English copywriting for translation team
python copywriting-tool/extractor.py \
  --locale en \
  --format xlsx \
  --output ./translation-assets \
  --prefix Translation_EN
```

### Example 2: Quick CSV for Content Review

```bash
# Generate quick CSV for stakeholder review
python copywriting-tool/extractor.py --format csv --prefix Content_Review
```

### Example 3: Multiple Projects

```bash
# Extract from different project
python copywriting-tool/extractor.py \
  --workspace ../other-project \
  --config ../other-project/copywriting-tool/copywriting.config.yml \
  --output ./all-projects-content
```

## Customization for Your Project

### 1. Update Route Mapping

Edit `route_mapping` in config to match your app's routes:

```yaml
extraction:
  route_mapping:
    HomePage: '/'
    AboutUs: '/about'
    ContactPage: '/contact'
    ProductListing: '/products'
```

### 2. Define Page Types

Categorize your sections:

```yaml
extraction:
  page_types:
    global:
      - Header
      - Footer
      - Sidebar
    marketing:
      - Hero
      - Features
      - Pricing
    app:
      - Dashboard
      - Settings
      - Profile
```

### 3. Skip Irrelevant Keys

Exclude non-copywriting data:

```yaml
extraction:
  skip_keys:
    - icon
    - image
    - color
    - className
    - metadata
```

### 4. Custom Styling

Match your brand colors in XLSX output:

```yaml
styling:
  header_color: '1E40AF'        # Blue-700
  header_text_color: 'FFFFFF'   # White
  alternate_row_color: 'EFF6FF' # Blue-50
```

## Troubleshooting

### Issue: "openpyxl not installed"

**Solution:**
```bash
pip install openpyxl
```

### Issue: "Locale not found"

**Solution:** Check that:
1. `locale_dir` in config matches your actual directory
2. `file_pattern` matches your filename format
3. The locale file exists (e.g., `messages/en.json`)

### Issue: No rows extracted

**Solution:** Check that:
1. JSON structure is nested objects/strings
2. Keys aren't in `skip_keys` list
3. `flatten_nested` is set to `true`

## Requirements

- Python 3.7+
- PyYAML: `pip install pyyaml`
- openpyxl: `pip install openpyxl` (optional, for XLSX export)

## Tips

💡 **Version Control** - Add `copywriting-tool/` to your repo for consistency across team  
💡 **Automation** - Integrate into pre-deployment scripts  
💡 **Localization** - Use CSV exports for translation management platforms  
💡 **Documentation** - Share generated XLSX files with non-technical stakeholders  
💡 **Backup** - Export copywriting regularly to track content changes  

## Testing the Tool

Test on your current Wisedrive project:

```bash
# From the Wisedrive project root
python copywriting-tool/extractor.py \
  --config copywriting-tool/copywriting.config.yml \
  --output ./test-output

# You should see output similar to:
# ✓ Loaded en locale from messages/en.json
# 📊 Extracted 254 copywriting items
# ✓ CSV file created: test-output/Copywriting_YYYYMMDD.csv
# ✓ XLSX file created: test-output/Copywriting_YYYYMMDD.xlsx
```

## License

MIT - Free to use in your projects

## Support

For issues or questions:
1. Check this README
2. Review `copywriting.config.yml` comments
3. Verify your i18n JSON structure matches expected format

---

**Made for Next.js + TypeScript + Vercel projects** 🚀
