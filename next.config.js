/** @type {import('next').NextConfig} */
require('dotenv').config();
const webpack = require('webpack');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [320, 768, 1024, 1400],
    domains: ['*'],
    imageSizes: [16, 32, 48, 56, 64, 96, 128, 256, 384]
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )

    return config
  },
}

module.exports = nextConfig
