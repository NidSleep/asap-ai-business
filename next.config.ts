import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files, served by Vercel exactly like the old site.
  output: "export",
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
