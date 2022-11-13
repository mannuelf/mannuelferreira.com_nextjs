module.exports = {
  mode: 'jit',
  // https://github.com/tailwindlabs/tailwindcss/discussions/6019#discussioncomment-1609444
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {},
      colors: {
        yellow: {
          DEFAULT: 'FAD000',
        },
        orange: {
          DEFAULT: '#FF9D00',
        },
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
          lg: '1280px',
          xl: '1440px',
          '2xl': '1536px',
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
