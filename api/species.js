import requests from './requests'
import { apiUrl } from './config'

async function fetchSpecies() {
  return await requests.get(`${apiUrl}/species/get-all/`)
}

module.exports = {
  fetchSpecies,
}
