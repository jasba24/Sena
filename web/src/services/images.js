import axios from "axios"
const baseURL = "http://localhost:3001/api/images"

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getImageById = (id) => {
  return axios.get(`${baseURL}/${id}`).then(({ data }) => data)
}

export const getImagesByCategory = (route) => {
  return axios.get(`${baseURL}/category/${route}`).then(({ data }) => data)
}

export const createImage = (newObject) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  }
  return axios.post(baseURL, newObject, config).then((res) => {
    const { data } = res
    return data
  })
}

export const deleteImages = (idsArray) => {
  const config = {
    headers: {
      Authorization: token,
    },
    data: { ids: idsArray },
  }

  return axios.delete(baseURL, config)
}

export const updateImage = (updatedObject) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  }

  const { id, formData } = updatedObject

  return axios.put(`${baseURL}/${id}`, formData, config).then((res) => {
    const { data } = res
    return data
  })
}
