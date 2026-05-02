/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.0.2.2'],
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
