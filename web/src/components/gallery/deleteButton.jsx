import React, { useState } from "react"
import { deleteImages, setToken } from "../../services/images"

function DeleteButton({
  selectedImages,
  handleSelectedImages,
  onUploadComplete,
}) {
  const token = JSON.parse(localStorage.getItem("loggedUser")).token
  setToken(token)
  const [feedback, setFeedback] = useState("")
  const deleteSelected = async () => {
    if (selectedImages.length === 0) return

    setFeedback("Eliminando imágenes...")
    try {
      await deleteImages(selectedImages)

      setFeedback("Imágenes eliminadas exitosamente ✅")

      handleSelectedImages((prevImages) =>
        prevImages.filter((img) => !selectedImages.includes(img.id))
      )

      handleSelectedImages([])
      setTimeout(() => {
        setFeedback(null)
      }, 5000)
      onUploadComplete?.()
    } catch (error) {
      console.error("Error al eliminar imagenes", error)
      setFeedback("Hubo un error al eliminar las imágenes ❌")
    }
  }
  return (
    <div>
      <button
        className="buy-button red"
        onClick={deleteSelected}
        disabled={selectedImages.length === 0}
      >
        Eliminar imagenes seleccionadas
      </button>
      {feedback && <div className="submitMessage">{feedback}</div>}
    </div>
  )
}

export default DeleteButton
