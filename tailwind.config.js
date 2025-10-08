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
          dark: '#085F5A',
          light: '#E6F4F1',
        },
        accent: {
          DEFAULT: '#FFD166',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F5F7FA',
          300: '#D1D5DB',
          600: '#4B5563',
          800: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

