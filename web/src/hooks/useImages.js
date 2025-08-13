import { useEffect, useState } from "react"
import { createImage, getAllImages } from "../services/images"

export const useImages = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    getAllImages().then((initialImages) => {
      setImages(initialImages)
    })
  }, [])

  const addImage = (imageObject) => {
    createImage(imageObject).then((newImage) => {
      setImages([...images, newImage])
    })
  }

  return {
    images,
    addImage,
  }
}
