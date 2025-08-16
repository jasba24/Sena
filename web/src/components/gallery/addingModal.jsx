import React, { useRef, useState } from "react"
import "../styles/modal.css"
import { createImage } from "../../services/images"
import { useParams } from "react-router-dom"

function AddingModal({ onClose, onUploadComplete }) {
  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState("")
  const [uploading, setUploading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const { category } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image || !price) {
      setFeedback("Faltan campos por completar ❌")
      return
    }

    setUploading(true)
    setFeedback("Subiendo imagen...")

    try {
      const formData = new FormData()
      formData.append("category", category)
      formData.append("price", price)
      formData.append("image", image)

      await createImage(formData)
      setFeedback("Imagen subida exitosamente ✅")

      setTimeout(() => {
        setFeedback(null)
        onUploadComplete?.()
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error al subir imagen:", error)
      setFeedback("Error al subir imagen ❌")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Agregar imagen y precio</h3>
        <form onSubmit={handleSubmit}>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Vista previa"
              className="preview-image"
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
          <input
            className="input-price"
            type="text"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button className="buy-button" type="submit" disabled={uploading}>
            {uploading ? "Subiendo..." : "Subir"}
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
