/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx}",
  ],
  theme: {
    screens: {
      'mobile': '320px',
      'mobile-M': '375px',
      'laptop': '1024px',
      'labtop-L': '1440px',
    },
    extend: {
      fontFamily: {
        inter: "'Inter', sans-serif",
        istok: "'Istok Web', sans-serif"
      }
    },
  },
  plugins: [require('daisyui'), require('tailwindcss-animated')],
}

