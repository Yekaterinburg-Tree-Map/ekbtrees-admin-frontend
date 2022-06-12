const superagent = require('superagent')

async function get(url, query) {
  const { body: response } = await superagent
    .get(url)
    .send(query)
  return response
}

async function post(url, body = {}, headers = {}) {
  const request = superagent.post(url)
  if (Object.keys(body).length) {
    request.send(body)
  }
  for (const header of Object.keys(headers)) {
    request.set(header, headers[header])
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

