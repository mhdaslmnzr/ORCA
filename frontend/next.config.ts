import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable SSR to prevent hydration issues
  experimental: {
    // Disable server-side rendering for components that cause hydration issues
    serverComponentsExternalPackages: ['@chakra-ui/react'],
  },
  
  // Add webpack configuration for better client-side handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure client-side only packages are properly handled
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Disable static optimization for dynamic content
  staticPageGenerationTimeout: 0,
  
  // Add headers to prevent caching issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
