import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const id = Math.floor(Math.random()*100000)
  const object = { id:id, content:content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }
