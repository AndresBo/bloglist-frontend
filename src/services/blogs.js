import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
// !!!
const like = async newObject => {
  
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.config.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, like, getOne }
