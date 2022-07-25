module.exports = {
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'cloudinary.com',
      'fastly.net',
      '*.fastly.net',
      'lastfm.freetls.fastly.net',
      'upload.wikimedia.org',
    ],
  },
  generateBuildId: () => 'build',
  typescript: {
    ignoreBuildErrors: false,
  },
};
