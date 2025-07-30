import { useImages } from "../utils/getImages"
import { useLocation } from 'react-router-dom';

function ImageContainer() {
  const location = useLocation()
  let route = location.pathname.split("/")[1].split("%20").join("")
  const images = useImages(route)

  return (
    <div className="product-container">
      <h1>
        Bolsos en cuero
      </h1>
      <div className="center-container">
        {images.map((url, i) => (
          <img key={i} className="product-image" src={url} alt={`img-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default ImageContainer
