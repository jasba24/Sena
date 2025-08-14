import React from 'react'

import '../styles/categories.css'

function Categories(props) {
  // eslint-disable-next-line react/prop-types
  const { categoryName, categoryLogo, categoryLink } = props
  return (
    <a className="category-link" href={categoryLink}>
      <img src={categoryLogo} title={categoryName} alt="Logo de la categoria" />
      <h1>{categoryName}</h1>
    </a>
  )
}

export default Categories
