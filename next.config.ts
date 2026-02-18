import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // @ts-ignore - Turbopack config for Next.js 16 build compatibility
  turbopack: {},
  /* config options here */
};

export default withPWA(nextConfig);
// export default nextConfig;
