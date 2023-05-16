/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  env: {
    buildDate: new Date().toISOString(),
  },
}

module.exports = nextConfig
