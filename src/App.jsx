import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Category from './pages/category'

function App() {
  return (
    <>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/category/:pageId" Component={Category}></Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
