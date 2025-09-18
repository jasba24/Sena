import axios from "axios"

const baseURL = "https://sena-9yju.onrender.com/api/orders"

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAllOrders = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  return axios.get(baseURL, config).then(({ data }) => data)
}

export const getOrderById = (id) => {
  return axios.get(`${baseURL}/${id}`).then(({ data }) => data)
}

export const createOrder = async (products) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const formatted = products.map((item) => ({
    name: item.name,
    category: item.category,
    price: item.price,
    image: item._id,
  }))

  const payload = {
    products: formatted,
    date: new Date(),
    status: "pendiente",
  }

  const response = await axios.post(baseURL, payload, config)

  return response.data
}

export const updateOrder = async (id, updates) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }

  return axios.patch(`${baseURL}/${id}`, updates, config)
}

export const deleteOrder = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  return axios.delete(`${baseURL}/${id}`, config)
}
