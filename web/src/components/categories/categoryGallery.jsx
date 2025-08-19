import React, { useEffect } from "react"
import { useGallery } from "../../context/GalleryContext"
import ButtonsContainer from "../gallery/buttonsContainer"
import EditingButton from "./editingButton"
import { getImagesByCategory } from "../../services/images"

function CategoryGallery({ subcategory }) {
  const { images, selectedImages, setSelectedImages, setRefreshFlag } =
    useGallery()

  useEffect(() => {
    const fetchImages = async () => {
      const response = await getImagesByCategory(subcategory)
      setSelectedImages([])
      setRefreshFlag((prev) => !prev)
    }

    fetchImages()
  }, [subcategory])

  const toggleSelect = (imageId) => {
    setSelectedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    )
  }

  return (
    <section className="subcategory-section" id={subcategory}>
      <h1 className="category-title">{subcategory}</h1>
      <ButtonsContainer />
      <div className="section-container spacing">
        {images.map((img) => (
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
              <EditingButton image={img} />
            </div>
            <h2>${img.price}</h2>
            <button className="buy-button">Agregar al carrito</button>
          </section>
        ))}
      </div>
    </section>
  )
}

export default CategoryGallery
