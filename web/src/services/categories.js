import axios from "axios"
const baseURL = "http://localhost:3001/api/categories"

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAllCategories = () => {
  return axios.get(baseURL).then(({ data }) => data)
}

export const createCategory = (newCategory) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  }

  return axios.post(baseURL, newCategory, config).then((res) => {
    const { data } = res
    return data
  })
}

export const updateCategory = ({ id, formData }) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  }

  return axios.put(`${baseURL}/${id}`, formData, config).then((res) => res.data)
}

export const deleteCategory = (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  return axios.delete(`${baseURL}/${id}`, config).then(({ data }) => data)
}
