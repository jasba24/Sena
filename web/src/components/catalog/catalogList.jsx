import ImageContainer from "./imageContainer"
import Gallery from "../gallery/gallery"
function CatalogList() {
  const user = localStorage.getItem("loggedUser")
  return user ? <Gallery></Gallery> : <ImageContainer></ImageContainer>
}

export default CatalogList
