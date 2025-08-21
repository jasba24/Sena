import { useParams } from "react-router-dom"
import { getOrderById, setToken, updateOrder } from "../services/orders"
import Login from "./login"
import { useEffect, useState } from "react"

function Order() {
  const user = JSON.parse(localStorage.getItem("loggedUser"))
  setToken(user.token)

  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [showInput, setShowInput] = useState(false)

  const bufferToBase64 = (buffer) => {
    if (buffer?.image?.data?.data) {
      const byteArray = new Uint8Array(buffer.image.data.data)
      const base64String = btoa(
        byteArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
      )
      return `data:image/jpeg;base64,${base64String}`
    }
  }

  const updateClient = async () => {
    setShowInput(true)
    const client = document.getElementById("input-client").value
    await updateOrder(id, { client })
    setShowInput(false)
  }

  const handleDelete = async (id) => {
    try {
      const updatedProduct = order.products.filter((item) => item._id !== id)

      const payload = updatedProduct.map((item) => ({
        ...item,
        image: item.image._id,
      }))

      await updateOrder(order._id, { products: payload })
      setOrder((prev) => ({
        ...prev,
        products: updatedProduct,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getOrder = async () => {
      const response = await getOrderById(id)
      setOrder(response)
    }

    getOrder()
  }, [])

  if (!user) return <Login />

  if (!order) return <h1 className="red">Pedido no encontrado</h1>
  return (
    <div>
      <h1>
        Pedido de {order?.client}
        {showInput && (
          <input
            id="input-client"
            type="text"
            placeholder="Nombre del cliente"
            value={order?.client || ""}
            required
            onChange={(e) =>
              setOrder((prev) => ({
                ...prev,
                client: e.target.value,
              }))
            }
          />
        )}
      </h1>
      <div className="center-container">
        <button onClick={updateClient} className="buy-button">
          {showInput ? "Agregar cliente" : "Modificar cliente"}
        </button>
      </div>
      <div className="section-container">
        {order?.products.map((item, i) => (
          <section key={i}>
            <img
              className="shopping-img product-image"
              src={bufferToBase64(item)}
              alt={item.image.name}
            />
            <h2>{item.image.price}</h2>
            <button
              className="buy-button red"
              onClick={() => handleDelete(item._id)}
            >
              Eliminar producto
            </button>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Order
