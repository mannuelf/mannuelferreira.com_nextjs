/** @type {import('next').NextConfig} */

const { v4: uuidv4 } = require('uuid');
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
  generateBuildId: async () => uuidv4(),
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { phase, isServer }) => {
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    if (phase === 'PHASE_DEVELOPMENT_SERVER' && isServer) {
      generateSitemap();
    }
    return config;
  },
};

export default nextConfig;
