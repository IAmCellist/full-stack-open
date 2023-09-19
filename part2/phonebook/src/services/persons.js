import axios from "axios"
const baseUrl = "/api/persons"

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (newObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const del= (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const personService = { getAll, create , update, del}

export default personService