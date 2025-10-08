/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A7D77',
          50: '#E6F5F4',
          100: '#CCEBE9',
          200: '#99D7D3',
          300: '#66C3BD',
          400: '#33AFA7',
          500: '#0A7D77',
          600: '#08645F',
          700: '#064B47',
          800: '#04322F',
          900: '#021918',
        },
        accent: {
          DEFAULT: '#FFD166',
          50: '#FFF8E8',
          100: '#FFF1D1',
          200: '#FFE3A3',
          300: '#FFD575',
          400: '#FFD166',
          500: '#FFBD33',
          600: '#FFA900',
          700: '#CC8700',
          800: '#996500',
          900: '#664300',
        },
        background: '#F5F7FA',
        'text-primary': '#1F2937',
        'text-secondary': '#4B5563',
      },
      fontFamily: {
        sans: ['Inter', 'Public Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

