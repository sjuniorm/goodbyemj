import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local /public/photos images (default) + unoptimized for simplicity
    unoptimized: false,
  },
};

export default nextConfig;
