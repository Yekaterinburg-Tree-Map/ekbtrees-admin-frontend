import requests from './requests'
import { apiUrl } from './config'

async function fetchUsers(page = 0, limit = 10) {
  return await requests.get(`${apiUrl}/user/getAll/${page}/${limit}`)
}

async function fetchUser(id) {
  return await requests.get(`${apiUrl}/user/${id}`)
}

async function updateUser(id) {
  return await requests.put(`${apiUrl}/user/${id}`)
}

module.exports = {
  fetchUsers,
  fetchUser,
  updateUser,
}
