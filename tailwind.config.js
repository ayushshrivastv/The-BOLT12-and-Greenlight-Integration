/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-black': '#000000',
        'apple-gray': '#1D1D1F',
        'apple-light-gray': '#86868B',
        'apple-blue': '#0071E3',
        'apple-dark-blue': '#0077ED',
      },
      fontFamily: {
        'apple': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 
