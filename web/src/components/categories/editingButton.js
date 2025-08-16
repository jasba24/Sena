import React, { useEffect, useState } from "react"
import editIcon from "../../assets/editIcon.png"
import "../styles/modal.css"
import { updateImage } from "../../services/images"

function EditingButton({ image, onUploadComplete }) {
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState(null)
  const [price, setPrice] = useState(image.price || "")

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("id", image._id)
    formData.append("price", price)
    if (file) formData.append("image", file)

    try {
      await updateImage({ id: image._id, formData })
      onUploadComplete()
      setShowModal(false)
    } catch (error) {
      console.error("Error al actualizar imagen:", error)
    }
  }

  const previewSrc = file
    ? URL.createObjectURL(file)
    : image?.data && image?.contentType
    ? `data:${image.content};base64,${image.data}`
    : null

  return (
    <>
      <div id="edit-icon" onClick={() => setShowModal(true)}>
        <img id="edit-img" src={editIcon} alt="Editar" />
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Editar imagen y precio</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                {previewSrc && (
                  <img src={previewSrc} alt="Vista previa" id="preview-image" />
                )}
                <label htmlFor="file-upload" className="file-label">
                  Seleccionar imagen
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <input
                  className="input-price"
                  type="text"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <button className="buy-button" type="submit">
                  Guardar cambios
                </button>
              </form>
              <button
                className="buy-button"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowModal(false)
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EditingButton
