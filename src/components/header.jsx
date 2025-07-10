import './styles/header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Link to={'/'} className="start">
        <h1 className="red-title">
          Marroquineria en cuero de alta calidad directamente de fábrica
        </h1>
      </Link>
    </header>
  )
}

export default Header
