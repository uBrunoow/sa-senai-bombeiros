/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      borderWidth: {
        width1: '1px',
      },
      colors: {
        preto: '#202020',
        offwhite: '#F5F5F5',
      },
    },
  },
  plugins: [],
}
