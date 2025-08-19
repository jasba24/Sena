import Product from "./product"
import EditingButton from "./../categories/editingButton"

function CategoryList({
  sectionName,
  categories,
  categoryLink,
  editable,
  selectedItems,
  setSelectedItems,
}) {
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <section className={sectionName} id={categoryLink}>
      <h1 className="category-title">{sectionName}</h1>
      <div className="section-container spacing">
        {categories?.map((cat) => (
          <Product
            key={cat._id}
            id={`${cat.title}/`}
            image={cat.image}
            name={cat.title}
            editable={editable}
            selected={selectedItems.includes(cat._id)}
            onSelect={() => toggleSelect(cat._id)}
            EditingComponent={<EditingButton type="category" data={cat} />}
          ></Product>
        ))}
      </div>
    </section>
  )
}

export default CategoryList
