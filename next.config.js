/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    buildDate: new Date().toISOString(),
  },
}

module.exports = nextConfig
