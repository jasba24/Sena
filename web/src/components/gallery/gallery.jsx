import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddingButton from "./addingButton"
import DeleteButton from "./deleteButton"
import SelectionButtons from "./SelectionButtons"
import { getImagesByCategory } from "../../services/images"
import EditingButton from "../categories/editingButton"

function Gallery() {
  const route = useParams()

  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [refreshFlag, setRefreshFlag] = useState(false)

  const toggleSelect = (imageId) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        return prevSelected.filter((id) => id !== imageId)
      } else {
        return [...prevSelected, imageId]
      }
    })
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responseImages = await getImagesByCategory(route.category)
        setImages(responseImages)
      } catch (error) {
        console.error("Error al obtener imágenes:", error)
      }
    }

    fetchImages()
  }, [refreshFlag])

  return (
    <div className="product-container">
      <h1>{route.category}</h1>
      <div className="gallery-container">
        <AddingButton
          onUploadComplete={() => setRefreshFlag((prev) => !prev)}
        />
        <SelectionButtons
          handleSelectedImages={(value) => {
            setSelectedImages(value)
          }}
          images={images}
        />
        <DeleteButton
          handleSelectedImages={(value) => {
            setSelectedImages(value)
          }}
          selectedImages={selectedImages}
          onUploadComplete={() => setRefreshFlag((prev) => !prev)}
        />
      </div>
      <div className="section-container spacing">
        {images.map((img) => (
          <section key={img._id}>
            <div className="checkbox-wrapper">
              <img
                className="product-image"
                src={`data:${img.contentType};base64,${img.data}`}
                alt={img.name}
                onClick={() => handleImageClick(img)}
              />
              <input
                type="checkbox"
                checked={selectedImages.includes(img._id)}
                onChange={() => toggleSelect(img._id)}
                className="image-checkbox"
              />
              <EditingButton
                onUploadComplete={() => setRefreshFlag((prev) => !prev)}
                image={img}
              />
            </div>
            <h2>${img.price}</h2>
            <button className="buy-button">Agregar al carrito</button>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Gallery
