import base64 from 'base-64'
import utf8 from 'utf8'

import requests from './requests'

function encodeCredentials(email = '', password = '') {
  return base64.encode(`${utf8.encode(email)}:${utf8.encode(password)}`)
}

async function fetchToken(email, password) {
  await requests.post(`/auth/login`, {}, { Authorization: encodeCredentials(email, password) })
}

async function refreshToken() {
  throw new Error('not implemented')
}

async function getToken() {
  throw new Error('not implemented')
}

module.exports = {
  fetchToken,
  refreshToken,
  getToken,
}
