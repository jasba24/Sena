import React from 'react'
import './styles/shoesList.css'
import { useLocation } from 'react-router-dom'
import Bolicheros from './shoesList/bolicheros'
import Tacon from './shoesList/tacon'
import Bolsos from './shoesList/Bolsos'

function ShoesList() {
  let location = useLocation()
  let route = location.pathname.split('/')[1].split('%20').join('')
  let routeImages = {
    Bolicheros: <Bolicheros></Bolicheros>,
    Tacones: <Tacon></Tacon>,
    Bolsos: <Bolsos></Bolsos>
  }

  return (
    <main>
      <div className="imgs">{routeImages[route]}</div>
    </main>
  )
}

export default ShoesList
