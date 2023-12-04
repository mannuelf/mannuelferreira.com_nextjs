import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */

import { v4 as uuidv4 } from "uuid";
import generateSitemap from "./scripts/sitemap-generator.mjs";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "cloudinary.com",
      "fastly.net",
      "*.fastly.net",
      "lastfm.freetls.fastly.net",
      "upload.wikimedia.org",
      "coverartarchive.org",
      "assets.fanart.tv",
    ],
  },
  generateBuildId: async () => uuidv4(),
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { phase, isServer }) => {
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    if (phase === "PHASE_DEVELOPMENT_SERVER" && isServer) {
      generateSitemap();
    }
    return config;
  },
};

export default withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "mannuelferreiracom",
    project: "javascript-nextjs",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
