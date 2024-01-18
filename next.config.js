/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
    ppr: true,
  },
};

module.exports = nextConfig;
