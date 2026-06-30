import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Only use basePath in production (GitHub Pages)
  basePath: isProduction ? '/ConvoFlow' : '',
  assetPrefix: isProduction ? '/ConvoFlow/' : '',
};

export default nextConfig;