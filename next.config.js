/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
  },
  images: {
    deviceSizes: [320, 768, 1024, 1400],
    domains: ['*'],
    imageSizes: [16, 32, 48, 56, 64, 96, 128, 256, 384]
  }
}

module.exports = nextConfig
