import { useEffect, useState } from "react"
import { getImagesByCategory } from "../../services/images"
import { useParams } from "react-router-dom"
import Loading from "../layout/loading"
import { useCart } from "../../context/CartContext"

function ImageContainer() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const route = useParams()

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImagesByCategory(route.category)
      setImages(images)
      setLoading(false)
      console.log(images.length)
    }
    fetchImages()
  }, [route.category])

  return (
    <div className="product-container">
      <h1>{route.category}</h1>
      <div className="center-container section-container">
        {!loading && images.length === 0 && (
          <div className="error message">
            No hay productos disponibles en este momento.
          </div>
        )}
        {loading ? (
          <Loading message="Cargando productos:" />
        ) : (
          images.map((img) => (
            <section key={img._id}>
              <img
                className="product-image"
                src={`data:${img.contentType};base64,${img.data}`}
                alt={img.name}
              />
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

export default ImageContainer
