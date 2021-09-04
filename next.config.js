module.exports = {
  target: 'serverless',
  images: {
    domains: [
      'res.cloudinary.com',
      'cloudinary.com',
      'fastly.net',
      '*.fastly.net',
      'lastfm.freetls.fastly.net',
      'upload.wikimedia.org'
    ],
  },
  typescript: {
    // I will undo this
    ignoreBuildErrors: true,
  },
};
