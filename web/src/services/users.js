import axios from 'axios'
const baseURL = 'https://sena-9yju.onrender.com/api/users'

export const createUser = async credentials => {
  const { data } = await axios.post(baseURL, credentials)
  return data
}
