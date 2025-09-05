import React, { useState } from "react"
import "../components/styles/product.css"
import "../components/styles/modal.css"
import Categories from "../components/catalog/categories"
import { getCategories } from "../utils/getCategories"
import { useCategories } from "../context/CategoryContext"
import CategoryList from "../components/catalog/categoryList"
import Loading from "./../components/layout/loading"
import { setToken } from "./../services/categories"
import ButtonsContainer from "./../components/gallery/buttonsContainer"
import { deleteCategory } from "../services/categories"
import AddingModal from "../components/gallery/addingModal"

function Category({}) {
  const productCategories = getCategories().categories
  const { setRefreshFlag, categories, loading } = useCategories()
  const [selectedCategories, setSelectedCategories] = useState([])
  const user = localStorage.getItem("loggedUser")
  const token = JSON.parse(localStorage.getItem("loggedUser"))?.token
  setToken(token)

  return (
    <>
      <h1 className="category-title">Categorías</h1>
      <section className="image-container">
        {productCategories.map((v, i) => {
          return (
            <Categories
              key={i}
              categoryName={v[0]}
              categoryLogo={v[1]}
              categoryLink={v[2]}
            />
          )
        })}
      </section>
      {user && (
        <ButtonsContainer
          items={categories}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
          onUploadComplete={() => setRefreshFlag((prev) => !prev)}
          deleteFunction={deleteCategory}
          entityName="categorías"
          buttonLabel="Agregar Categoría"
          ModalComponent={AddingModal}
        />
      )}
      {loading ? (
        <Loading message="Cargando categorias..." />
      ) : (
        <CategoryList
          sectionName="Calzado"
          categories={categories.Calzado}
          categoryLink="#shoes"
          editable={!!user}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
        ></CategoryList>
      )}
      {!loading && (
        <CategoryList
          sectionName="Bolsos"
          categories={categories.Bolsos}
          categoryLink="#bag"
          editable={!!user}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
        ></CategoryList>
      )}
    </>
  )
}

export default Category
