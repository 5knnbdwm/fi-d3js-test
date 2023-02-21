/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};