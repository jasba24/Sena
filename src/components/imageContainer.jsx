import { useImages } from "../utils/getImages"

function ImageContainer() {
  let route = location.pathname.split("/")[1].split("%20").join("")
  const images = useImages(route)

  return (
    <div className="product-container">
      <h1>
        Bolsos en cuero <br /> Valor: 160.000
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
