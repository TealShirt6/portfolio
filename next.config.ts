import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [20, 75, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  }
};

export default nextConfig;
