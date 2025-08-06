import "./styles/header.css"
import { Link } from "react-router-dom"
import profile from "../assets/login.png"

function Header() {
  return (
    <header>
      <Link to={"/"} className="start">
        <h1 className="red-title">
          Marroquineria en cuero de alta calidad directamente de fábrica
        </h1>
      </Link>
      <Link to={"/login"}>
        <img className="icon login-icon" src={profile} alt="login image" />
      </Link>
    </header>
  )
}

export default Header
