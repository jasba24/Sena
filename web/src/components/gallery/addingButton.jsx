import React, { useState } from "react"
import { useLocation } from "react-router-dom"

function AddingButton({ ModalComponent, onUploadComplete, buttonLabel }) {
  const [showModal, setShowModal] = useState(false)
  const categoryPath = useLocation().pathname.split("/")[1]

  return (
    <div>
      <button className="buy-button" onClick={() => setShowModal(true)}>
        {buttonLabel}
      </button>
      {showModal && (
        <ModalComponent
          type={categoryPath === "category" ? "category" : "image"}
          onClose={() => setShowModal(false)}
          onUploadComplete={onUploadComplete}
        />
      )}
    </div>
  )
}

export default AddingButton
