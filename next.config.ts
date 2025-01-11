import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin",
        permanent: true, // true일 경우 301 리다이렉트 (SEO에 반영됨)
      },
    ];
  },
};

export default nextConfig;
