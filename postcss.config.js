const purgeCss = require('@fullhuman/postcss-purgecss')({
  content: [
    './public/**/*.html',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: ['tailwindcss', 'autoprefixer'],
};
