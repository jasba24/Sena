import { Navigate, useLocation, useParams } from "react-router-dom"
import { getOrderById, setToken, updateOrder } from "../services/orders"
import { useEffect, useState } from "react"
import Loading from "./../components/layout/loading"

function Order() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [showInput, setShowInput] = useState(false)
  const [editedClient, setEditedClient] = useState("")
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  const bufferToBase64 = (buffer) => {
    if (buffer?.image?.data?.data) {
      const byteArray = new Uint8Array(buffer.image.data.data)
      const base64String = btoa(
        byteArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
      )
      return `data:image/jpeg;base64,${base64String}`
    }
  }

  const toggleShowInput = () => {
    setEditedClient(order?.client || "")
    setShowInput(!showInput)
  }

  const updateClient = async () => {
    await updateOrder(id, { client: order.client })
    setOrder((prev) => ({
      ...prev,
      client: editedClient,
    }))

    toggleShowInput()
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
      try {
        const response = await getOrderById(id)
        setOrder(response)
      } catch (error) {
        console.error("Error al obtener el pedido:", error)
      } finally {
        setLoading(false)
      }
    }

    getOrder()
  }, [])

  if (!user) return <Navigate to={"/admin/login"} state={{ from: location }} replace />
  setToken(user.token)
  if (loading) return <Loading message="Cargando pedido..." />
  if (!order) return <h1 className="red">Pedido no encontrado</h1>
  if (order.products.length === 0) {
    return (
      <>
        {order.client && <h1>Pedido de {order.client}</h1>}
        <h1>Este pedido no contiene productos actualmente</h1>
      </>
    )
  }

  return (
    <div>
      <h1>
        Pedido de {order?.client}
        {showInput && (
          <>
            <input
              id="input-client"
              type="text"
              placeholder="Nombre del cliente"
              value={editedClient}
              required
              onChange={(e) => setEditedClient(e.target.value)}
            />
            <button onClick={updateClient} className="buy-button green">
              Guardar cliente
            </button>
          </>
        )}
      </h1>
      <div className="center-container">
        {!showInput && (
          <button onClick={toggleShowInput} className="buy-button">
            Modificar cliente
          </button>
        )}
        <p></p>
        {showInput && (
          <button onClick={toggleShowInput} className="buy-button">
            Cancelar
          </button>
        )}
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
