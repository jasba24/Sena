import "../styles/header.css"
import { Link } from "react-router-dom"
import Menu from "./menu"
import { useAuth } from "../../context/AuthContext"
import cart from "../../assets/cart.png"

function Header() {
  const { user } = useAuth()

  return (
    <header>
      <Link to={"/"} className="start">
        <h1 className="red-title">
          Marroquineria en cuero de alta calidad directamente de fábrica
        </h1>
      </Link>
      {user ? (
        <Menu />
      ) : (
        <Link to="/cart">
          <img src={cart} alt="shooping cart" />{" "}
        </Link>
      )}
    </header>
  )
}

export default Header
