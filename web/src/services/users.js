import axios from 'axios'
const baseURL = 'http://localhost:3001/api/users'

export const createUser = async credentials => {
  const { data } = await axios.post(baseURL, credentials)
  return data
}
