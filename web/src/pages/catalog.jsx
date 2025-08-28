import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "../components/styles/shoesList.css"
import "../components/styles/product.css"
import CatalogList from "../components/catalog/catalogList"
import { getAllCategories } from "../services/categories"


function Catalog() {
  const { category } = useParams()
  const [validCategories, setValidCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      await getAllCategories().then((data) => {
        setValidCategories(data.map((cat) => cat.title))
      })
    }
    fetchCategories()
  })

  if (
    validCategories.includes(decodeURIComponent(category))
  ) {
    return (
      <main>
        <div className="center-container">
          <div className="images-container">
            <div className="imgs">
              <CatalogList></CatalogList>
            </div>
          </div>
        </div>
      </main>
    )
  } else {
    return (
      <div className="error">
        Pagina no encontrada. Regresa al <Link to="/">inicio</Link>
      </div>
    )
  }
}

export default Catalog
