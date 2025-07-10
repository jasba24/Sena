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

function ProductContainer({ url }) {
  const productUrl = `${url}*.jpg`
  const images160000 = importAll(
    import.meta.glob(`../../assets/${productUrl}`, { eager: true })
  )

  const images190000 = importAll(
    import.meta.glob(['../../assets/bolicheros/190000/*.jpg'], { eager: true })
  )
  return (
    <div className="product-container">
      <h1>
        Bolicheros en cuero <br /> Valor: 160.000
      </h1>
      <div className="section-container">
        {images160000.map((v, i) => {
          return <img key={i} src={v.path} alt="" />
        })}
      </div>
      <h1>Precio: 190.000</h1>
      <div className="section-container">
        {images190000.map((v, i) => {
          return <img key={i} src={v.path} alt="" />
        })}
      </div>
    </div>
  )
}

export default ProductContainer
