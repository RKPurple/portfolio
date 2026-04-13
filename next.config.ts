import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/projects", destination: "/#projects", permanent: false },
    ];
  },
};

export default nextConfig;
