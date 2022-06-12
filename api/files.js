import requests from './requests'
import { apiUrl } from '@/api/config'

async function fetchFile(fileId) {
  return await requests.get(`${apiUrl}/file/${fileId}`)
}

module.exports = {
  fetchFile,
}
