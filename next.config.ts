import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  rewrites: async () => {
    return [
      {
        source: "/admin-api",
        destination: process.env.NEXT_PUBLIC_ADMIN_API!,
      },
    ];
  },
};

export default nextConfig;
