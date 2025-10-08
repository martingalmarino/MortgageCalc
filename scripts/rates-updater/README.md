# 📊 ČNB Mortgage Rates Updater

Automated system for fetching and updating mortgage interest rates from the Czech National Bank (ČNB).

## 🎯 Purpose

This system automatically fetches the latest average mortgage interest rates from ČNB and updates the calculator's default rate, ensuring users always see current market conditions.

## 📁 Structure

```
scripts/rates-updater/
├── fetchCNBRates.ts        # Fetches data from ČNB
├── updateMortgageData.ts   # Updates local JSON file
└── README.md               # This file

lib/
└── mortgageRatesCZ.json    # Stored rate data (auto-updated)
```

## 🚀 Usage

### Manual Update

Run the updater manually:

```bash
npm run update:rates
```

This will:
1. Fetch the latest mortgage rate from ČNB
2. Validate the data
3. Update `/lib/mortgageRatesCZ.json`
4. Log any changes

### Expected Output

```
🚀 Starting mortgage rate update...

🔍 Fetching mortgage rates from ČNB...
📖 Current rate: 5.5%
✅ Successfully fetched from ČNB

📈 Rate changed: 5.5% → 5.6% (+0.1%)

💾 Saved to: /lib/mortgageRatesCZ.json
✅ Data updated successfully!
📅 Last updated: 2025-10-08
📊 Source: ČNB
```

## 📊 Data Source

### Primary: ČNB ARAD System
- Official API/CSV endpoint
- Most reliable source
- URL: `https://www.cnb.cz/arad/`

### Fallback: HTML Scraping
- ČNB statistics page
- Used if API is unavailable
- URL: `https://www.cnb.cz/cs/financni-trhy/`

### Last Resort: Market Estimate
- Hardcoded reasonable value
- Ensures calculator always works
- Should be manually verified

## 🔧 Data Format

The updated JSON file contains:

```json
{
  "lastUpdated": "2025-10-08",
  "averageRate": 5.5,
  "rateDecimal": 0.055,
  "source": "ČNB ARAD",
  "period": "October 2025",
  "note": "Automated update"
}
```

### Fields:
- `lastUpdated`: ISO date of last update
- `averageRate`: Percentage (e.g., 5.5 for 5.5%)
- `rateDecimal`: Decimal form (e.g., 0.055)
- `source`: Data source identifier
- `period`: Time period represented
- `note`: Optional notes

## ⚙️ Integration

The calculator automatically loads rates from `mortgageRatesCZ.json`:

```typescript
// lib/mortgageCalc.ts
import ratesData from './mortgageRatesCZ.json';

export function getReferenceInterestRate(): number {
  return ratesData.averageRate;
}
```

## 🕒 Automated Updates (Future)

### GitHub Actions (Recommended)

Create `.github/workflows/update-rates.yml`:

```yaml
name: Update Mortgage Rates

on:
  schedule:
    # Run on 5th of each month at 3 AM UTC
    - cron: '0 3 5 * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  update-rates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Update rates
        run: npm run update:rates
      
      - name: Commit changes
        run: |
          git config user.name "Rate Updater Bot"
          git config user.email "bot@mortgage-calc.cz"
          git add lib/mortgageRatesCZ.json
          git commit -m "chore: update mortgage rates from ČNB" || echo "No changes"
          git push
```

### Vercel Cron Jobs (Alternative)

If using Vercel, create an API route:

```typescript
// pages/api/cron/update-rates.ts
import { updateMortgageData } from '../../../scripts/rates-updater/updateMortgageData';

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await updateMortgageData();
  res.status(200).json(result);
}
```

Configure in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/update-rates",
    "schedule": "0 3 5 * *"
  }]
}
```

## 🛡️ Error Handling

The system is resilient to failures:

1. **API Unavailable**: Falls back to HTML scraping
2. **Scraping Fails**: Uses market estimate
3. **Invalid Data**: Keeps previous rate
4. **File Write Error**: Logs error, doesn't crash app

## 🔍 Validation

Rates are validated to ensure sanity:
- Must be between 1% and 20%
- Rounded to 1 decimal place
- Logged if change exceeds 0.1%

## 🧪 Testing

Test the fetcher directly:

```bash
npx ts-node scripts/rates-updater/fetchCNBRates.ts
```

## 📝 Maintenance

### When ČNB Changes Their Website

If ČNB updates their HTML structure:

1. Visit https://www.cnb.cz/cs/financni-trhy/
2. Inspect the mortgage rates table
3. Update selectors in `fetchFromHTML()` function
4. Test with: `npm run update:rates`

### Updating Fallback Rate

If all data sources fail, update the fallback in `createFallbackData()`:

```typescript
const marketRate = 5.5; // Update this value
```

## 🚨 Troubleshooting

### Rate Not Updating
```bash
# Check if script runs
npm run update:rates

# Verify JSON file
cat lib/mortgageRatesCZ.json

# Check for errors
npm run update:rates --verbose
```

### Invalid Rate Error
- Check ČNB website manually
- Verify scraping selectors
- Update fallback value if needed

### File Permission Error
```bash
# Fix permissions
chmod 644 lib/mortgageRatesCZ.json
```

## 📚 Resources

- [ČNB Official Website](https://www.cnb.cz)
- [ČNB ARAD System](https://www.cnb.cz/arad/)
- [Mortgage Statistics](https://www.cnb.cz/cs/financni-trhy/statistiky/)

## 🤝 Contributing

To improve the rate fetcher:

1. Test on real ČNB data
2. Add better CSV parsing
3. Implement rate history tracking
4. Add notification system
5. Improve error messages

---

**Note**: This is an MVP implementation. For production use, verify ČNB's official API documentation and update the fetcher accordingly.

