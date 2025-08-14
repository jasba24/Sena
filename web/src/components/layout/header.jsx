import "../styles/header.css"
import { Link } from "react-router-dom"
import Menu from "./menu"

function Header() {
  const userIsLogged = localStorage.getItem("loggedUser")
  return (
    <header>
      <Link to={"/"} className="start">
        <h1 className="red-title">
          Marroquineria en cuero de alta calidad directamente de fábrica
        </h1>
      </Link>
      {userIsLogged && <Menu></Menu>}
    </header>
  )
}

export default Header
