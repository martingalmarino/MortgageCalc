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
        heroFrom: '#4CEC5D',        // Hero gradient start
        heroTo: '#38C851',          // Hero gradient end
        primary: '#2E7D32',         // Main CTA and active elements
        primaryHover: '#256628',    // Hover/focus for CTA
        accent: '#43A047',          // Badges, highlights
        neutralBg: '#F9FAFB',       // Global page background
        cardBg: '#FFFFFF',          // Cards and content boxes
        cardBorder: '#E5E7EB',      // Subtle card borders
        navBg: '#1B5E20',           // Navbar and footer background
        textMain: '#1F2937',        // Main text
        textSecondary: '#4B5563',   // Secondary text
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

