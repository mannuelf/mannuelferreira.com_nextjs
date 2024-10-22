import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverExternalPackages: ["puppeteer", "puppeteer-core", "@sparticuz/chromium"] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.fastly.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "coverartarchive.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.fanart.tv",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mannuelferreira.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      await build(this.options); // start velite
    });
  }
}

export default nextConfig;
