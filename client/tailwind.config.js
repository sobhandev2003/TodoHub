/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
        "playfair-display": ["Playfair Display", "serif"]
      },
      textColor: {
        "33867d6": "#3867d6",
        "006266": "#006266"
      },
      screens: {
      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }
      },
    },
  },
  plugins: [],
}