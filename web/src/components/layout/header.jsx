import "../styles/header.css"
import { Link } from "react-router-dom"
import Menu from "./menu"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"

function Header() {
  const { user } = useAuth()

  return (
    <header>
      <Link to={"/"} className="start">
        <h1 className="red-title">
          Marroquineria en cuero de alta calidad directamente de fábrica
        </h1>
      </Link>
      {user && <Menu />}
    </header>
  )
}

export default Header
