module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6862B7',
        secondary: '#F2B658',
        red: '#C94630',
        black: '#39403F'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
    // require('@tailwindcss/aspect-ratio')
  ]
}
