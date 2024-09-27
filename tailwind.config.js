/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#003BD2',
        'blue-hover': '#0031B2',
        'light-blue': '#5667FF',
        'primary-text': '#000000',
        'secondary-text': '#333333',
        'blue-gradient': 'var(--blue-gradient)',
      },
    },
  },
  plugins: [],
};
