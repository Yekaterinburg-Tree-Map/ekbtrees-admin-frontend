const EKBTREES_SERVER_URL = process.env.EKBTREES_SERVER_URL || 'https://ekb-trees-help.ru/api'
const EKBTREES_AUTH_URL = process.env.EKBTREES_AUTH_URL || 'https://ekb-trees-help.ru/auth'
const EKBTREES_BASE_URL = process.env.EKBTREES_BASE_URL || 'https://ekb-trees-help.ru'

module.exports = {
  reactStrictMode: true,

  basePath: '/admin',

  publicRuntimeConfig: {
    EKBTREES_SERVER_URL,
    EKBTREES_AUTH_URL,
    EKBTREES_BASE_URL
  },

  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'https://ekb-trees-help.ru/auth/:path*', // Proxy to Backend
        basePath: false,
      }
    ]
  }
}
