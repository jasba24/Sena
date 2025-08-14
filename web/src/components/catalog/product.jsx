import React from "react"

import { Link } from "react-router-dom"

function Product(props) {
  // eslint-disable-next-line react/prop-types
  const { image, name, id } = props
  return (
    <section>
      <img src={image} alt="referencia del producto" />
      <h2>{name}</h2>
      <Link to={`/${id}`}>
        <button className="buy-button">ver productos</button>
      </Link>
    </section>
  )
}

export default Product
