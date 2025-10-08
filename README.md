# 🏠 Hypoteční Kalkulačka - Mortgage Calculator MVP for Czech Republic

A conversion-optimized mortgage calculator with programmatic SEO for major cities in the Czech Republic. Built with Next.js, TypeScript, and Tailwind CSS, featuring a fintech-grade design inspired by Taxfix.

## ✨ Features

- **📊 Mortgage Calculator**: Calculate monthly payments, total repayment, and interest breakdown
- **🌐 Programmatic SEO**: Dynamic pages for 18+ major Czech cities
- **🎨 Taxfix-Inspired Design**: Clean, trustworthy fintech UI with teal primary color (#0A7D77)
- **🚀 Performance Optimized**: Server-side rendering, fast load times, excellent Lighthouse scores
- **📱 Mobile-First**: Responsive design optimized for all devices
- **♿ Accessible**: ARIA labels, proper contrast, keyboard navigation
- **🔍 SEO-Ready**: Meta tags, OpenGraph, JSON-LD structured data for FAQs and WebApplication
- **💰 CTC Module**: Conversion-focused "Compare Banks" component

## 🏗️ Project Structure

```
├── components/
│   ├── CalculatorForm.tsx       # Input form for mortgage parameters
│   ├── CalculatorHero.tsx       # Hero section with embedded calculator
│   ├── CTACompareBanks.tsx      # Conversion module for bank comparison
│   ├── CityPills.tsx            # City interlinking navigation
│   ├── FAQAccordion.tsx         # FAQ section with JSON-LD
│   └── ResultSummary.tsx        # Mortgage calculation results display
├── lib/
│   ├── citiesCZ.ts              # List of Czech cities for SEO
│   ├── mortgageCalc.ts          # Core mortgage calculation logic
│   └── utils.ts                 # Utility functions (cn helper)
├── pages/
│   ├── _app.tsx                 # Next.js app wrapper
│   ├── _document.tsx            # Custom HTML document
│   ├── index.tsx                # Homepage (redirects to Prague)
│   └── cz/hypotecni-kalkulacka/
│       └── [city].tsx           # Dynamic city pages
├── styles/
│   └── globals.css              # Global styles with Tailwind
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Vercel deployment configuration
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System

### Color Palette (Taxfix-Inspired)

- **Primary**: `#0A7D77` (Teal) - Main brand color
- **Accent**: `#FFD166` (Warm yellow) - Highlights and hover states
- **Background**: `#F5F7FA` (Light neutral)
- **Text Primary**: `#1F2937` (Dark gray)
- **Text Secondary**: `#4B5563` (Medium gray)

### Typography

- **Font**: Inter (loaded from Google Fonts)
- **Headings**: Bold, approachable
- **Body**: 16-18px for optimal readability

## 🧮 Mortgage Calculation

The calculator uses the standard amortization formula:

```
M = P × r × (1 + r)^n / ((1 + r)^n - 1)
```

Where:
- **M** = Monthly payment
- **P** = Principal (property price - down payment)
- **r** = Monthly interest rate (annual rate / 12 / 100)
- **n** = Total number of months (years × 12)

### Inputs
- Property price (CZK)
- Down payment (% or amount)
- Interest rate (% annual)
- Loan term (years)

### Outputs
- Monthly payment
- Total repayment
- Total interest paid
- Principal vs. interest breakdown (visual)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

## 📦 Deployment to Vercel

This project is optimized for Vercel deployment:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration
   - Click "Deploy"

3. **Environment Variables** (if needed in future):
   - Add any API keys or environment variables in Vercel dashboard
   - Example: `CNB_API_KEY` for future CNB interest rate integration

## 🌐 SEO & Programmatic Pages

The app generates static pages for 18 major Czech cities:

- Praha, Brno, Ostrava, Plzeň, Liberec, Olomouc
- České Budějovice, Hradec Králové, Ústí nad Labem
- Pardubice, Zlín, Havířov, Kladno, Most
- Opava, Frýdek-Místek, Karlovy Vary, Jihlava

Each city page includes:
- City-specific H1 and meta description
- JSON-LD structured data
- Internal linking to other cities
- City-contextualized FAQ

## 🔮 Future Enhancements

- [ ] Integration with CNB (Czech National Bank) API for real-time interest rates
- [ ] Amortization schedule table
- [ ] Comparison of different loan scenarios
- [ ] PDF export of calculation results
- [ ] Email/SMS sharing of results
- [ ] Analytics integration (Google Analytics 4)
- [ ] A/B testing for CTA optimization

## 📄 License

This project is created as an MVP for educational and commercial purposes.

## 🤝 Contributing

This is a proprietary project. For questions or collaboration, please contact the repository owner.

---

Built with ❤️ for the Czech mortgage market | 2025

