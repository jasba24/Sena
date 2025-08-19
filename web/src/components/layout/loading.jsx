import React from "react"
import "../styles/loading.css"

function Loading({ message = "Cargando..." }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <h1>{message}</h1>
    </div>
  )
}

export default Loading