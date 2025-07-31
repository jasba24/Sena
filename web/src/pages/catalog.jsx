import React from "react"
import "../components/styles/shoesList.css"
import "../components/styles/product.css"
import CatalogList from "../components/catalogList"

function Catalog() {
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
}

export default Catalog
