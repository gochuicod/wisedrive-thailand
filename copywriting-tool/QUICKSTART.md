# Quick Start Guide - Copywriting Extractor

## For New Next.js Projects

### 1. Copy Tool to Your Project

```bash
# From your Wisedrive project
cp -r copywriting-tool /path/to/your-new-nextjs-project/

# Or manually copy the entire copywriting-tool folder
```

### 2. Install Dependencies

```bash
cd /path/to/your-new-nextjs-project
pip install -r copywriting-tool/requirements.txt
```

### 3. Configure for Your Project

Edit `copywriting-tool/copywriting.config.yml`:

```yaml
input:
  locale_dir: messages  # or locales, or app/i18n, etc.
  locales: [en]
  file_pattern: '{locale}.json'

extraction:
  route_mapping:
    # Map your section names to routes
    HomePage: '/'
    AboutPage: '/about'
    ContactPage: '/contact'
  
  page_types:
    global: [Navigation, Footer, Header]
    marketing: [Hero, Features, Pricing]
    app: [Dashboard, Settings]
```

### 4. Run the Tool

```bash
# Basic usage
python copywriting-tool/extractor.py

# With options
python copywriting-tool/extractor.py \
  --output ./exports \
  --format both \
  --prefix MyProject
```

## Testing on Wisedrive (This Project)

Already configured! Just run:

```bash
# Test extraction
python copywriting-tool/extractor.py \
  --config copywriting-tool/copywriting.config.yml \
  --output ./test-output

# Expected output:
# ✓ Loaded en locale
# 📊 Extracted ~500 copywriting items
# ✓ CSV file created
# ✓ XLSX file created
```

## Integration with package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "copy:extract": "python copywriting-tool/extractor.py",
    "copy:csv": "python copywriting-tool/extractor.py --format csv",
    "copy:xlsx": "python copywriting-tool/extractor.py --format xlsx",
    "copy:export": "python copywriting-tool/extractor.py --output ./exports"
  }
}
```

Then use:
```bash
npm run copy:extract
```

## Common Configurations

### E-commerce Project

```yaml
extraction:
  route_mapping:
    ProductsHome: '/products'
    ProductDetail: '/products/[id]'
    Cart: '/cart'
    Checkout: '/checkout'
  
  page_types:
    global: [Navigation, Footer, SearchBar]
    shop: [ProductsHome, ProductDetail, Cart]
    checkout: [Checkout, PaymentForm]
```

### SaaS Project

```yaml
extraction:
  route_mapping:
    Landing: '/'
    Pricing: '/pricing'
    Dashboard: '/dashboard'
    Settings: '/settings'
  
  page_types:
    global: [Navigation, Footer]
    marketing: [Landing, Pricing, Features]
    app: [Dashboard, Settings, Profile]
```

### Multi-language Project

```yaml
input:
  locales: [en, es, fr, de]  # Multiple locales

# Then extract each:
# python copywriting-tool/extractor.py --locale en --prefix EN
# python copywriting-tool/extractor.py --locale es --prefix ES
```

## Customization Tips

### 1. Custom Content Types

Edit `extractor.py` method `_infer_content_type()` to add your patterns:

```python
def _infer_content_type(self, key_path: str, last_key: str) -> str:
    key_lower = key_path.lower()
    
    # Your custom patterns
    if 'tooltip' in key_lower:
        return 'tooltip'
    if 'error' in key_lower:
        return 'error_message'
    
    # ... existing patterns
```

### 2. Change Output Columns

Edit config to add/remove columns:

```yaml
output:
  columns:
    - route
    - page
    - section
    - content_type
    - key
    - word_count  # Add custom columns in extractor.py
```

### 3. Custom Styling

Brand colors in XLSX:

```yaml
styling:
  header_color: 'FF6B6B'        # Your brand red
  header_text_color: 'FFFFFF'
  alternate_row_color: 'FFF5F5' # Light red
```

## Troubleshooting

### Python not found
```bash
# Install Python 3.7+ from python.org
# Or use pyenv/conda
```

### ModuleNotFoundError: yaml
```bash
pip install pyyaml openpyxl
```

### No output generated
- Check your `messages/` directory exists
- Verify `en.json` file is present
- Check console for error messages

### Wrong routes/content types
- Update `route_mapping` in config
- Update `page_types` in config
- Verify your JSON structure matches expected format

## Best Practices

1. **Version control** - Commit `copywriting-tool/` to git
2. **Separate configs** - Use different configs for dev/prod
3. **Regular exports** - Run weekly for content backups
4. **Translation workflow** - Export → Translate → Import
5. **CI/CD integration** - Add to deployment pipeline

## Next Steps

- ✅ Tool is installed and tested
- ✅ Configuration is set up
- 📝 Review README.md for full documentation
- 🚀 Run extraction whenever you need copywriting exports
- 🔧 Customize config as your project grows

---

**Questions?** Check [README.md](README.md) for detailed documentation.
