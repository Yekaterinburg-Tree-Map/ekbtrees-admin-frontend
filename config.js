import getConfig from "next/config"
const config = getConfig().publicRuntimeConfig

export const EKBTREES_SERVER_URL = config.EKBTREES_SERVER_URL
