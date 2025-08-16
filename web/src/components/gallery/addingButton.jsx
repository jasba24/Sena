import React, { useState } from "react"
import AddingModal from "./addingModal"

function AddingButton({ onUploadComplete }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button className="buy-button" onClick={() => setShowModal(true)}>
        Agregar Imagen y Precio
      </button>
      {showModal && (
        <AddingModal
          onClose={() => setShowModal(false)}
          onUploadComplete={onUploadComplete}
        />
      )}
    </div>
  )
}

export default AddingButton
