import { useState } from "react"
import profile from "../../assets/menu.png"
import "../styles/menu.css"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function Menu() {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleLogout = (toggleMenu) => {
    logout()
    navigate("/")
  }

  return (
    <div className="menu-container">
      <img
        className="icon login-icon"
        src={profile}
        alt="login image"
        onClick={toggleMenu}
      />

      {showMenu && (
        <div className="dropdown-menu">
          <button className="close-button" onClick={toggleMenu}>
            ✕
          </button>
          <ul>
            <li>
              <Link
                to={"/admin/login/change"}
                className="menu-option"
                onClick={toggleMenu}
              >
                Cambiar contraseña
              </Link>
            </li>
            <li>
              <button className="menu-option" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Menu
