import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    // Allow local static images imported as modules (src/ directory).
    // No remote patterns needed for local assets.
    localPatterns: [
      {
        pathname: "/assets/img/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
