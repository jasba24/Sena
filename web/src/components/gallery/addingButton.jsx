import React, { useRef, useState } from "react"
import { createImage } from "../../services/images"
import { useParams } from "react-router-dom"

function AddingButton({ onUploadComplete }) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const { category } = useParams()

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    setUploading(true)
    setFeedback("Subiendo imágenes...")

    try {
      const formData = new FormData()
      formData.append("category", category)

      files.forEach((file) => formData.append("images", file))

      await createImage(formData)

      setFeedback("Imágenes subidas exitosamente ✅")
      setTimeout(() => {
        setFeedback(null)
      }, 5000)
      onUploadComplete?.()
    } catch (error) {
      console.error("Error al subir imágenes:", error)
      setFeedback("Hubo un error al subir las imágenes ❌")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <button
        className="buy-button"
        onClick={handleButtonClick}
        disabled={uploading}
      >
        {uploading ? "Subiendo..." : "Agregar Imágenes"}
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {feedback && <div className="submitMessage">{feedback}</div>}
    </div>
  )
}

export default AddingButton
