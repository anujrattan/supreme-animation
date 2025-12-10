import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Netlify: Remove static export to use Next.js SSR
  // For GoDaddy: Uncomment output: 'export' and images.unoptimized
  // output: 'export',
  // images: {
  //   unoptimized: true,
  // },
  // trailingSlash: true,
};

export default nextConfig;
