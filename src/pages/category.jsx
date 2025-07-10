import React from 'react'
import '../components/styles/product.css'
import Categories from '../components/categories'
import CategoryList from '../components/categoryList'
import { getCategories } from '../utils/getCategories'
// import falsaLocion from '../assets/falsaLocion.jpeg'

function Category() {
  window.scroll(0, 0)
  let params = location.pathname.split('/')[2]

  const categories = getCategories(params).categories
  const productCategories = getCategories(params).productCategories

  return (
    <>
      <h1 className='category-title'>Categorías</h1>
      <section className="image-container">
        {categories.map((v, i) => {
          return (
            <Categories
              key={i}
              categoryName={v[0]}
              categoryLogo={v[1]}
              categoryLink={v[2]}
            />
          )
        })}
      </section>
      {categories.map((v, i) => {
        return (
          <CategoryList
            key={i}
            sectionName={v[0]}
            productImage={v[1]}
            categoryLink={v[3]}
            productName={productCategories[i]}
          />
        )
      })}
    </>
  )
}

export default Category
