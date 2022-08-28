/** @type {import('next').NextConfig} */

import generateSitemap from './scripts/sitemap-generator.mjs';

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
  webpack: (config, { isServer }) => {
    if (isServer) {
      generateSitemap();
    }
    return config;
  },
};

export default nextConfig;
