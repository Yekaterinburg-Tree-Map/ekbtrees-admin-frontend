import requests from './requests'
import { apiUrl } from './config'

async function fetchTrees(offset = 0, limit = 10) {
  return await requests.get(`${apiUrl}/tree/getAll/${offset}/${limit}`)
}

async function fetchTree(id) {
  return await requests.get(`${apiUrl}/tree/get/${id}`)
}

async function updateTree(id) {
  return await requests.put(`${apiUrl}/tree/${id}`)
}

async function deleteTree(id) {
  return await requests.del(`${apiUrl}/tree/${id}`)
}

module.exports = {
  fetchTrees,
  fetchTree,
  updateTree,
  deleteTree
}
