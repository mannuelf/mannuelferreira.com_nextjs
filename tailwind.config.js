module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      boxShadow: {},
      colors: {},
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
