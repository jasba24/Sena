import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage"
import { firebaseApp } from "../main"
import { createElement } from "react"

export function getImages(params, route) {
  const storage = getStorage(firebaseApp, "gs://test-55f80.appspot.com")
  
  const listRef =
    params == 1
      ? ref(storage, `YF/${route}/160.000`)
      : ref(storage, `${route}/160.000`)
  listAll(listRef).then((res) => {
    console.log(res)
    const container = document.getElementById("images-container")
    const list = []
    res.items.map((e) => {
      getDownloadURL(
        ref(storage, `gs://test-55f80.appspot.com/${e._location.path}`)
      ).then((url) => {
        const c1 = createElement(
          "div",
          {
            id: "images-container",
            className: "catalog",
          },
          createElement(
            "a",
            { className: "catalog1", onClick: "{() => navigate('/Bolsos/2'}" },
            "Catalogo 2",
            createElement("img", { className: "product-image", src: url })
          )
        )
        list.push({ url })
        const img = document.createElement("img")
        img.className = "product-image"
        img.src = url
        container.appendChild(img)
      })
    })
  })
}

export function getOneImage(params, route) {
  const storage = getStorage(firebaseApp, "gs://test-55f80.appspot.com")
  const listRef =
    params == 1
      ? ref(storage, `YF/${route}/160.000`)
      : ref(storage, `${route}/160.000`)
  listAll(listRef).then((res) => {
    const container = document.getElementById("bolsos-container")

    getDownloadURL(
      ref(storage, `gs://test-55f80.appspot.com/${res.items[0]._location.path}`)
    ).then((url) => {
      /*const c1 = createElement(
        "div",
        {
          id: "images-container",
          className: "catalog",
        },
        createElement(
          "a",
          { className: "catalog1", onClick: "{() => navigate('/Bolsos/2'}" },
          "Catalogo 2",
          createElement("img", { className: "product-image", src: url })
        )
      )
      container.appendChild(c1)*/
      const img = document.createElement("img")
      img.className = "product-image"
      img.src = url
      let link
      params == 1
        ? (link = document.getElementById("c1"))
        : (link = document.getElementById("c2"))
      link.appendChild(img)
    })
  })
}
