/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
  generateBuildId: async () => '1234',
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
