import { useEffect, useState } from "react"
import { getImagesByCategory } from "../../services/images"
import { useParams } from "react-router-dom"

function ImageContainer() {
  const [images, setImages] = useState([])
  const route = useParams()
  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImagesByCategory(route.category)
      setImages(images)
    }
    fetchImages()
  })

  return (
    <div className="product-container">
      <h1>{route.category}</h1>
      <div className="center-container">
        {images.map((img) => (
          <img
            key={img._id}
            className="product-image"
            src={`data:${img.contentType};base64,${img.data}`}
            alt={img.name}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageContainer
