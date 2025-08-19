import { createContext, useContext, useEffect, useState } from "react"
import { getAllCategories } from "../services/categories"

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshFlag, setRefreshFlag] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const data = await getAllCategories()
      const grouped = data.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
      }, {})

      setCategories(grouped)
      setLoading(false)
    }
    fetch()
  }, [refreshFlag])

  return (
    <CategoryContext.Provider value={{ categories, setCategories, refreshFlag, setRefreshFlag, loading }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategories = () => useContext(CategoryContext)
