// eslint-disable-next-line no-unused-vars
import React from 'react'
import './styles/footer.css'

import logo from '../assets/logo.png'
import whatsapp from '../assets/whatsapp.png'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'

function Footer() {
  return (
    <div className="footer">
      <img className="logo" src={logo} alt="logo" />
      <div>
        <span>Variedades Milú Shoes</span>
      </div>
      <div className="footer-link">
        <a href="https://www.facebook.com/lucelly.bedoyagarzon" target="_blank">
          <img src={facebook} alt="facebook-icon" />
        </a>
        <a className="phone" href="https://wa.link/wg8v7o" target="_blank">
          <img src={whatsapp} alt="whatsapp-icon" />
          +57 315 437 9739
        </a>
      </div>
    </div>
  )
}

export default Footer
