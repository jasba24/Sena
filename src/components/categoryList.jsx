/* eslint-disable react/prop-types */
import React from "react"
import Product from "./product"

function CategoryList(props) {
  const { sectionName, productName, productImage, categoryLink } = props

  return (
    <section className={sectionName} id={categoryLink}>
      <h1 className="category-title">{sectionName}</h1>
      <div className="section-container">
        {productName &&
          productName.map((v, i) => (
            <Product
              key={i}
              id={`${v}/`}
              image={productImage}
              name={v}
            ></Product>
          ))}
      </div>
    </section>
  )
}

export default CategoryList
