import AddingButton from "./addingButton"
import SelectionButtons from "./selectionButtons"
import DeleteButton from "./deleteButton"

function ButtonsContainer({
  items,
  selectedItems,
  setSelectedItems,
  onUploadComplete,
  deleteFunction,
  entityName = "elementos",
  buttonLabel = "Agregar",
  ModalComponent,
}) {
  return (
    <div className="gallery-container">
      <AddingButton
        buttonLabel={`${buttonLabel}`}
        ModalComponent={ModalComponent}
        onUploadComplete={onUploadComplete}
      />
      <SelectionButtons handleSelectedItems={setSelectedItems} items={items} />
      <DeleteButton
        selectedItems={selectedItems}
        handleSelectedItems={setSelectedItems}
        onUploadComplete={onUploadComplete}
        deleteFunction={deleteFunction}
        entityName={entityName}
      />
    </div>
  )
}

export default ButtonsContainer
