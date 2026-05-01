/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    qualities: [75, 90],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

// Made with Bob
