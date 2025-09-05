import React, { useState } from "react"
import editIcon from "../../assets/editIcon.png"
import "../styles/modal.css"
import { updateImage } from "../../services/images"
import { useGallery } from "../../context/GalleryContext"
import { updateCategory } from "../../services/categories"
import { useCategories } from "../../context/CategoryContext"

function EditingButton({ type = "image", data, setCategories }) {
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState(null)
  const [price, setPrice] = useState(data.price || "")
  const [title, setTitle] = useState(data.title || "")
  const [category, setCategory] = useState(data.category || "")
  const [feedback, setFeedback] = useState("")
  const galleryContext = type === "image" ? useGallery() : null
  const categoryContext = type === "category" ? useCategories() : null

  const handleSubmit = async () => {
    const formData = new FormData()

    try {
      if (file) formData.append("image", file)
      if (type === "image") {
        formData.append("id", data._id)
        formData.append("price", price)
        await updateImage({ id: data._id, formData })
        galleryContext?.setRefreshFlag?.((prev) => !prev)
      }

      if (type === "category") {
        formData.append("title", title)
        formData.append("category", category)
        const updatedCat = (await updateCategory({ id: data._id, formData }))
          .data

        if (categoryContext.setCategories) {
          categoryContext.setCategories((prev) => {
            const oldKey = data.category
            const newKey = updatedCat.category

            const oldArray = [...(prev[oldKey] || [])]
            const indexToRemove = oldArray.findIndex(
              (c) => String(c._id) === String(updatedCat._id)
            )
            if (indexToRemove !== -1) {
              oldArray.splice(indexToRemove, 1)
            }

            const newArray = [...(prev[newKey] || [])]
            const alredyExists = newArray.some(
              (c) => String(c._id) === String(updatedCat._id)
            )

            if (!alredyExists) {
              newArray.push(updatedCat)
            }

            const nuevoEstado = {
              ...prev,
              [oldKey]: oldArray,
              [newKey]: newArray,
            }

            return nuevoEstado
          })
        }
        setTimeout(() => {
          categoryContext?.setRefreshFlag?.((prev) => !prev)
        }, 3000)
      }
      setFeedback("Imagen editada correctamente")
      setTimeout(() => {
        setShowModal(false)
      }, 3000)
    } catch (error) {
      console.error("Error al actualizar imagen:", error)
      setFeedback("Error al actualizar imagen ❌")
    }
  }

  const previewSrc = file
    ? URL.createObjectURL(file)
    : type === "image" && data?.data && data?.contentType
    ? `data:${data.contentType};base64,${data.data}`
    : typeof data.image === "string" && data.image.startsWith("data:")
    ? data.image
    : null

  return (
    <>
      <div id="edit-icon" onClick={() => setShowModal(true)}>
        <img id="edit-img" src={editIcon} alt="Editar" />
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>
                {type === "image"
                  ? "Editar imagen y precio"
                  : "Editar categoría"}
              </h3>
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
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Calzado">Calzado</option>
                      <option value="Bolsos">Bolsos</option>
                    </select>
                  </>
                )}
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
              {feedback && <div className="submitMessage">{feedback}</div>}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EditingButton
