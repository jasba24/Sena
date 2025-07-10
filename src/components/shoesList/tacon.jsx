import ImageContainer from './imageContainer'

function importAll(r) {
  let images = []
  Object.values(r).forEach(({ default: path }) => {
    const url = new URL(path, import.meta.url)
    const data = {
      path: url.pathname
    }
    images.push(data)
  })

  return images
}
const images100000Sintetico = importAll(
  import.meta.glob(['../../assets/Tacon/100000sintetico60000/*.jpg'], {
    eager: true
  })
)

const images165000FiqueCuero85000 = importAll(
  import.meta.glob(['../../assets/Tacon/165000FiqueCuero85000/*.jpg'], {
    eager: true
  })
)

// const images190000 = importAll(
//   import.meta.glob(['../../assets/tacon/190000/*.jpg'], { eager: true })

function Tacon() {
  return (
    <div className="product-container">
      <h1>
        Tacon Sintético <br /> Valor: 100.000
      </h1>
      <div className="section-container">
        <ImageContainer imgs={images100000Sintetico}></ImageContainer>
      </div>
       <h1>Valor: 165.000</h1>
      <div className="section-container">
        <ImageContainer imgs={images165000FiqueCuero85000}></ImageContainer>
      </div>
    </div>
  )
}

export default Tacon
