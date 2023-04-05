/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hashBlue: '#487EB0',
        lightGray:'#EEEDED',
        themeColor: '#EEEDED',
        searchColor: '#F6F4F4',
        buttonColor: '#487EBO',
        tableHeader: '#D9D9D9',
        btnColor: 'rgb(36, 35, 65)'
      }
    },
  },
  plugins: [],
}
