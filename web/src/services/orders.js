import axios from "axios"

const baseURL = "http://localhost:3001/api/orders"

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
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
  console.log(response.data)

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
