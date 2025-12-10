import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GoDaddy shared hosting
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with routing on static hosts
};

export default nextConfig;
