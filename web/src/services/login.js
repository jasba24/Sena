import axios from "axios"
const baseURL = "http://localhost:3001/api/"
let token = null

export const login = async (credentials) => {
  const { data } = await axios.post(`${baseURL}login`, credentials)
  return data
}

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const changePassword = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  }
  const { data } = await axios.put(`${baseURL}users`, credentials, config)
  return data
}
