/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/login",
      },
    ];
  },
}

module.exports = nextConfig
