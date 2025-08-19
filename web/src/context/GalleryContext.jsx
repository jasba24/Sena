// src/context/GalleryContext.js
import { createContext, useContext, useEffect, useState } from "react"
import { getImagesByCategory } from "../services/images"
import { useParams } from "react-router-dom"

const GalleryContext = createContext()

export function GalleryProvider({ children }) {
  const { category } = useParams()
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [refreshFlag, setRefreshFlag] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responseImages = await getImagesByCategory(category)
        setImages(responseImages)
      } catch (error) {
        console.error("Error al obtener imágenes:", error)
      }
    }

    fetchImages()
  }, [category, refreshFlag])

  return (
    <GalleryContext.Provider
      value={{
        images,
        selectedImages,
        setSelectedImages,
        refreshFlag,
        setRefreshFlag,
        category,
      }}
    >
      {children}
    </GalleryContext.Provider>
  )
}

export function useGallery() {
  return useContext(GalleryContext)
}
