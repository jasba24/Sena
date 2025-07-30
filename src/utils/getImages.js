import { useState, useEffect } from "react"
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage"
import { firebaseApp } from './../firebaseConfig';


export function useImages(route) {
  const [images, setImages] = useState([])
  const storage = getStorage(firebaseApp, 'gs://test-55f80.appspot.com')

  useEffect(() => {
    const listRef = ref(storage, `YF/${route}/160.000`)
    listAll(listRef).then((res) => {
      const promises = res.items.map((item) => getDownloadURL(item))
      Promise.all(promises).then((urls) => {
        setImages(urls)
      })
    })
  }, [route])

  return images
}
