import superagent from 'superagent'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

async function get(url, query) {
  const token = cookies.get('AccessToken')

  const request = superagent
    .get(url)
    .send(query)

  if (token) {
    request.set('Authorization', `Bearer ${token}`)
  }

  const { body: response } = await request
  return response
}

async function post(url, body = {}, headers = {}) {
  const token = cookies.get('AccessToken')

  const request = superagent.post(url)
  if (Object.keys(body).length) {
    request.send(body)
  }
  for (const header of Object.keys(headers)) {
    request.set(header, headers[header])
  }
  if (token) {
    request.set('Authorization', `Bearer ${token}`)
  }
  const { body: response } = await request
  return response
}

async function put(url, body = {}) {
  const { body: response } = await superagent
    .put(url)
    .send(body)
  return response
}

async function del(url) {
  return await superagent
    .delete(url)
}

module.exports = {
  get,
  post,
  put,
  del,
}

