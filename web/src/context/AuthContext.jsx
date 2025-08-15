import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser")
    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error al parsear loggedUser:", error)
      localStorage.removeItem("loggedUser") // Limpieza preventiva
      setUser(null)
    }
  }, [])

  const loginContext = (userData) => {
    if (userData) {
      localStorage.setItem("loggedUser", JSON.stringify(userData))
      setUser(userData)
    }
  }

  const logout = () => {
    localStorage.removeItem("loggedUser")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
