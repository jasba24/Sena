import React from "react"
import "../components/styles/home.css"
import { Link } from "react-router-dom"
import logo1 from "../assets/heroImage.png"

function Home() {
  return (
    <>
      <h1 className="red-title">Catalogos disponibles </h1>
      <div className="catalog-container">
        <Link to={"/category/1"}>
          <img src={logo1} alt="" />
          <h1 className="yellow-link">Ver catalogo 1</h1>
        </Link>
        <Link to={"/category/2"}>
          <img src={logo1} alt="" />
          <h1 className="yellow-link">Ver catalogo 2</h1>
        </Link>
      </div>
    </>
  )
}
export default Home
