const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Ensure '@' alias resolves to the 'src' directory in all environments (including Vercel)
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    // Also ensure extensions resolution includes TS/TSX
    config.resolve.extensions = Array.from(new Set([".ts", ".tsx", ".js", ".jsx", ".json", ...config.resolve.extensions]));
    return config;
  },
};

module.exports = nextConfig;
