import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server rendering is required; the authenticated preview entrypoint owns internal routes.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
