import React, { useEffect, useRef, useState } from "react"
import "../styles/modal.css"
import { createImage, setToken } from "../../services/images"
import { useParams } from "react-router-dom"
import { createCategory } from "../../services/categories"

function AddingModal({ type = "image", onClose, onUploadComplete }) {
  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState("")
  const [title, setTitle] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const { category: routeCategory } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("image", image)

      if (type === "image") {
        if (!image || !price) {
          setFeedback("Faltan campos por completar ❌")
          setUploading(false)
          return
        }
        formData.append("category", routeCategory)
        formData.append("price", price)

        const created = await createImage(formData)
        setFeedback("Imagen subida exitosamente ✅")
        onUploadComplete?.(created.data)
      }

      if (type === "category") {
        if (!title || !categoryInput || !image) {
          setFeedback("Faltan campos por completar ❌")
          setUploading(false)
          return
        }
        formData.append("title", title)
        formData.append("category", categoryInput)
        const created = await createCategory(formData)
        setFeedback("Categoría creada exitosamente ✅")
        onUploadComplete?.(created.data)
      }
      setTimeout(() => {
        setFeedback(null)
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error al crear:", error)
      setFeedback("Error al subir ❌")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          {type === "image" ? "Agregar imagen y precio" : "Agregar categoría"}
        </h3>
        <form onSubmit={handleSubmit}>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Vista previa"
              id="preview-image"
            />
          )}
          <label htmlFor="file-upload" className="file-label">
            Seleccionar imagen
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
          {type === "image" && (
            <input
              className="input-price"
              type="text"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          )}
          {type === "category" && (
            <>
              <input
                className="input-price"
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <select
                className="input-price"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="Calzado">Calzado</option>
                <option value="Bolsos">Bolsos</option>
              </select>
            </>
          )}
          <button className="buy-button" type="submit" disabled={uploading}>
            {uploading ? "Subiendo..." : "Crear"}
          </button>
          <button className="buy-button" type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
        {feedback && <div className="submitMessage">{feedback}</div>}
      </div>
    </div>
  )
}

export default AddingModal
