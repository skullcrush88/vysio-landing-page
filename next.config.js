/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for Docker deployment
  allowedDevOrigins: ['10.0.2.2'],
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [],
    qualities: [75, 90],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

// Made with Bob
