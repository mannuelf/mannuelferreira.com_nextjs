module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      boxShadow: {},
      colors: {
        purple: {
          light: '#5E36F4',
          DEFAULT: '#5E36F4',
          dark: '#5E36F4',
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
