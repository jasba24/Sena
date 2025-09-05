import React, { useEffect, useState } from "react"
import "../components/styles/shopping.css"
import { createOrder } from "./../services/orders"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

function Shopping() {
  const [loading, setLoading] = useState(false)
  const { cartItems, removeFromCart } = useCart()

  const handleBuy = async () => {
    setLoading(true)

    try {
      const savedOrder = await createOrder(cartItems)
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

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="section-container">
          <h1 className="red-title">No has agregado ningún producto.</h1>
          <h1>
            ¿Deseas explorar nuevos productos?{" "}
            <Link to="/category/1">Haz clic aquí</Link>
          </h1>
        </div>
      ) : (
        <>
          <h1>Tus productos son los siguientes:</h1>
          <h1>Total de productos: {cartItems.length}</h1>
          <div className="section-container">
            {cartItems.map((item, i) => (
              <section key={i}>
                <img
                  className="shopping-img product-image"
                  src={`data:image/jpeg;base64,${item.data}`}
                  alt={item.name}
                />
                <h2>{item.price}</h2>
                <button
                  className="buy-button red"
                  onClick={() => removeFromCart(item._id)}
                >
                  Eliminar producto
                </button>
              </section>
            ))}
          </div>
        </>
      )}
      <div className="center-container">
        <button
          className="buy-button green"
          onClick={handleBuy}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Enviando..." : "Comprar vía WhatsApp"}
        </button>
      </div>
    </div>
  )
}

export default Shopping
