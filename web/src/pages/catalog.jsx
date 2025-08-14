import React from "react"
import { Link, useParams } from "react-router-dom"
import "../components/styles/shoesList.css"
import "../components/styles/product.css"
import CatalogList from "../components/catalog/catalogList"
import { getCategories } from "../utils/getCategories"

function Catalog() {
  const validCategories = getCategories().productCategories
  const { category } = useParams()
  if (
    validCategories[0].includes(category) ||
    validCategories[1].includes(category)
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
