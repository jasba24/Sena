import React from 'react'
import '../components/styles/product.css'
import CatalogList from '../components/catalogList'
import { Link } from 'react-router-dom'

function Catalog() {
  return (
    <main>
      <Link className="yellow-link title" to={'/Bolsos'}>
        Volver
      </Link>

      <div className="imgs">
        <CatalogList></CatalogList>
      </div>
    </main>
  )
}

export default Catalog
