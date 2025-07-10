import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Shoes from './pages/shoes'
import Category from './pages/category'
import Catalog from './pages/catalog';

function App() {
  return (
    <>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/:category/" Component={Shoes}></Route>
            <Route exact path="/:category/:pageId/" Component={Catalog}></Route>
            <Route exact path="/category/:pageId" Component={Category}></Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
