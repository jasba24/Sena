// context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || []
    setCartItems(stored)
  }, [])

  const addToCart = (item) => {
    const exists = cartItems.some((i) => i._id === item._id)
    if (!exists) {
      const updated = [...cartItems, item]
      setCartItems(updated)
      localStorage.setItem("cart", JSON.stringify(updated))
      alert("Producto agregado al carrito 🛒")
    } else {
      alert("Este producto ya está en el carrito.")
    }
  }

  const removeFromCart = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto del carrito?"
    )
    if (!confirmDelete) return
    const updated = cartItems.filter((item) => item._id !== id)
    setCartItems(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    alert("Producto eliminado correctamente ✅")
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
