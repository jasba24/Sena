import { GalleryProvider, useGallery } from "../../context/GalleryContext"
import ButtonsContainer from "./buttonsContainer"
import EditingButton from "../categories/editingButton"
import Loading from "./../layout/loading"
import { deleteImages, setToken } from "../../services/images"
import AddingModal from "./addingModal"

function GalleryContent() {
  const {
    images,
    selectedImages,
    setSelectedImages,
    setRefreshFlag,
    category,
  } = useGallery()

  const token = JSON.parse(localStorage.getItem("loggedUser"))?.token
  setToken(token)

  const addToCart = (img) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const exists = cart.some((item) => item._id === img._id)
    if (!exists) {
      cart.push(img)
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }

  const toggleSelect = (imageId) => {
    setSelectedImages((prevSelected) => {
      return prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    })
  }
  return (
    <div className="product-container">
      <h1>{category}</h1>
      <ButtonsContainer
        items={images}
        selectedItems={selectedImages}
        setSelectedItems={setSelectedImages}
        onUploadComplete={() => setRefreshFlag((prev) => !prev)}
        deleteFunction={deleteImages}
        entityName="imágenes"
        buttonLabel="Agregar Imágen y Precio"
        ModalComponent={AddingModal}
      />
      <div className="section-container spacing">
        {images.length === 0 ? (
          <Loading message="Cargando productos..." />
        ) : (
          images.map((img) => (
            <section key={img._id}>
              <div className="checkbox-wrapper">
                <img
                  className="product-image"
                  src={`data:${img.contentType};base64,${img.data}`}
                  alt={img.name}
                />
                <input
                  type="checkbox"
                  checked={selectedImages.includes(img._id)}
                  onChange={() => toggleSelect(img._id)}
                  className="image-checkbox"
                />
                <EditingButton type="image" data={img} />
              </div>
              <h2>${img.price}</h2>
              <button className="buy-button" onClick={() => addToCart(img)}>
                Agregar al carrito
              </button>
            </section>
          ))
        )}
      </div>
    </div>
  )
}

export default function Gallery() {
  return (
    <GalleryProvider>
      <GalleryContent />
    </GalleryProvider>
  )
}
