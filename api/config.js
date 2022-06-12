import getConfig from 'next/config'
const config = getConfig().publicRuntimeConfig

export const apiUrl = config.EKBTREES_SERVER_URL
export const authUrl = config.EKBTREES_AUTH_URL
export const baseUrl = config.EKBTREES_BASE_URL
