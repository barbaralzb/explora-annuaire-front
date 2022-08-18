const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      body: ['"Josefin Sans"']
    },
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr'
      },
      colors: {
        primary: '#6862B7',
        secondary: '#F2B658',
        red: '#C94630',
        black: '#39403F'
      },
      backgroundImage: {
        'hero-pattern': "url('/images/bbblurry-15.svg')",
        squares: "url('/images/square-bg.svg')",
        dots: "url('/images/points.svg')",
        dotssquares: "url('/images/dotssquares.svg')",
        blubbles: "url('/images/rrrainbow.svg')",
        'square-indigo': "url('/images/bg-square-indigo.svg')",
        'square-orange': "url('/images/bg-square-orange.svg')"
      },
      backgroundPosition: {
        top: 'top',
        '-top-40': 'center top -400px'
      }
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ]
})
