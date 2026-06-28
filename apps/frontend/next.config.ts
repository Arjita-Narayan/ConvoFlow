import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // This creates a static 'out' folder
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with GitHub Pages routing
  basePath: '/ConvoFlow', // Your repository name
  assetPrefix: '/ConvoFlow/',
};

export default nextConfig;