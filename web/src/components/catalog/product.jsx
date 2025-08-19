import React, { useEffect } from "react"

import { Link } from "react-router-dom"

function Product({
  id,
  image,
  name,
  editable,
  selected,
  onSelect,
  EditingComponent,
}) {

  return (
    <section>
      <div className="checkbox-wrapper">
        <img
          id="categories-image"
          className="product-image"
          src={image}
          alt="referencia del producto"
        />
        {editable && (
          <>
            <input
              type="checkbox"
              checked={selected}
              onChange={onSelect}
              className="image-checkbox"
            />
            {EditingComponent}
          </>
        )}
        <h2>{name}</h2>
        <Link to={`/${id}`}>
          <button className="buy-button">ver productos</button>
        </Link>
      </div>
    </section>
  )
}

export default Product
