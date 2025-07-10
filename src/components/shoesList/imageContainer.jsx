import { getImages } from '../../utils/getImages'

function ImageContainer() {
  let params = location.pathname.split('/')[2]
  let route = location.pathname.split('/')[1].split('%20').join('')

  getImages(params, route)

  return (
    <div className="product-container">
      <h1>
        Bolsos en cuero <br /> Valor: 160.000
      </h1>
      <div id="images-container"></div>
    </div>
  )
}

export default ImageContainer
