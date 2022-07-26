module.exports = {
  // https://github.com/tailwindlabs/tailwindcss/discussions/6019#discussioncomment-1609444
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      boxShadow: {},
      colors: {
        purple: {
          light: '#2D2B55',
          DEFAULT: '#2D2B55',
          dark: '#2D2B55',
        },
      },
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',
        },
      },
      fontSize: {},
      letterSpacing: {},
      lineHeight: {},
      screens: {},
      spacing: {},
    },
  },
};
