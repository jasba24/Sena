import React from "react"

function SelectionButtons({ handleSelectedImages, images }) {
  const selectAll = () => {
    const allIds = images.map((img) => img._id)
    handleSelectedImages(allIds)
  }

  const deselectAll = () => {
    handleSelectedImages([])
  }

  return (
    <>
      <div>
        <button className="buy-button green" onClick={selectAll}>
          Seleccionar Todas
        </button>
      </div>
      <div>
        <button className="buy-button green" onClick={deselectAll}>
          Deseleccionar Todas
        </button>
      </div>
    </>
  )
}

export default SelectionButtons
