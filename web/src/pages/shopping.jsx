import React, { useEffect, useState } from "react"
import "../components/styles/shopping.css"
import { createOrder } from "./../services/orders"

function Shooping() {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(storedCart)
  }, [])

  const handleBuy = async () => {
    setLoading(true)

    try {
      const savedOrder = await createOrder(cart)
      const pedidoId = savedOrder._id
      const link = `${window.location.origin}/pedido/${pedidoId}`

      const message = `Hola, quiero consultar por los siguientes productos:\n\n${link}`
      const whatsappNumber = "573205451804"
      const encodedMessage = encodeURIComponent(message)
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      window.open(whatsappLink, "_blank")
    } catch (error) {
      console.error("Error al crear el pedido:", error)
      alert("Hubo un problema al enviar tu pedido. Intenta de nuevo.")
    }

    setLoading(false)
  }

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  return (
    <div>
      <h1>Tus productos son los siguientes:</h1>
      <div className="section-container">
        {cart.map((item, i) => (
          <section key={i}>
            <img
              className="shopping-img product-image"
              src={`data:image/jpeg;base64,${item.data}`}
              alt={item.name}
            />
            <h2>{item.price}</h2>
            <button
              className="buy-button red"
              onClick={() => handleDelete(item._id)}
            >
              Eliminar producto
            </button>
          </section>
        ))}
      </div>
      <div className="center-container">
        <button
          className="buy-button green"
          onClick={handleBuy}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Comprar vía WhatsApp"}
        </button>
      </div>
    </div>
  )
}

export default Shooping
