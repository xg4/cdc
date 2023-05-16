/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    buildDate: new Date().toISOString(),
  },
  webpack(config) {
    Object.assign(config.resolve.alias, {
      dayjs: 'dayjs/esm',
      lodash: 'lodash-es',
    })
    return config
  },
}

module.exports = nextConfig
