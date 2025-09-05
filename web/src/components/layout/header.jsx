import "../styles/header.css"
import { Link } from "react-router-dom"
import Menu from "./menu"
import { useAuth } from "../../context/AuthContext"
import cart from "../../assets/cart.png"
import { useCart } from "../../context/CartContext"

function Header() {
  const { user } = useAuth()
  const { cartItems } = useCart()

  return (
    <header>
      <Link to={"/"} className="start">
        <h1 className="red-title">
          Marroquineria en cuero de alta calidad directamente de fábrica
        </h1>
      </Link>
      <div className="center-container">
        <Link to="/cart">
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
          <img src={cart} alt="Shopping cart" />
        </Link>
        {user && <Menu />}
      </div>
    </header>
  )
}

export default Header
