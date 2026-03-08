/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#004AAD',
          dark: '#003A8C',
          light: '#E8F0FE',
          glow: 'rgba(0,74,173,0.08)',
          border: 'rgba(0,74,173,0.25)',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F7F9FC',
          sidebar: '#F1F5F9',
        },
        border: {
          DEFAULT: '#E2E8F0',
          hover: '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
