import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/puzzle",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
