/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    buildDate: new Date().toISOString(),
  },
}

module.exports = nextConfig
