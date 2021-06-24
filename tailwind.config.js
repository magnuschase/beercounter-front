const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '330px',
      ...defaultTheme.screens,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
