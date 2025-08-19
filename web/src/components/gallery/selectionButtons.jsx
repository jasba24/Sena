import React from "react"

function SelectionButtons({ handleSelectedItems, items }) {
  const selectAll = () => {
    const allIds = items.map((item) => item._id)
    handleSelectedItems(allIds)
  }

  const deselectAll = () => {
    handleSelectedItems([])
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
