import React from "react"
import "../components/styles/shopping.css"

function Shooping() {
  const imgs = []
  for (let i = 0; i < localStorage.length; i++) {
    imgs.push(localStorage.getItem(i))
  }
  return (
    <div>
      <h1>Tus productos son los siguientes:</h1>
      <div className="section-container">
        {imgs.map((img, i) => {
          return (
            <a href="">
              <img
                className="shopping-img product-image"
                key={i}
                src={img}
                alt=""
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Shooping
