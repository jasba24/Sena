import React, { useState } from "react"
import { useCategories } from "../../context/CategoryContext"

function DeleteButton({
  selectedItems,
  handleSelectedItems,
  deleteFunction,
  entityName,
}) {
  const [feedback, setFeedback] = useState("")
  const categoryContext = entityName === "categorías" ? useCategories() : null

  const deleteSelected = async () => {
    if (selectedItems.length === 0) return

    setFeedback(`Eliminando ${entityName}...`)
    try {
      await Promise.all(selectedItems.map((id) => deleteFunction(id)))

      setFeedback(`${entityName} eliminadas exitosamente ✅`)

      handleSelectedItems((prevItems) =>
        prevItems.filter((item) => !selectedItems.includes(item.id))
      )

      handleSelectedItems([])
      setTimeout(() => {
        setFeedback(null)
      }, 4000)

      categoryContext?.setRefreshFlag?.((prev) => {
        return !prev
      })
    } catch (error) {
      console.error(`Error al eliminar ${entityName}`, error)
      setFeedback(`Hubo un error al eliminar ${entityName} ❌`, error)
    }
  }
  return (
    <div>
      <button
        className="buy-button red"
        onClick={deleteSelected}
        disabled={selectedItems.length === 0}
      >
        Eliminar {entityName} seleccionadas
      </button>
      {feedback && <div className="submitMessage">{feedback}</div>}
    </div>
  )
}

export default DeleteButton
