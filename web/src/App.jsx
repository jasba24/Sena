import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import Home from "./pages/home"
import Category from "./pages/category"
import Catalog from "./pages/catalog"
import Login from "./pages/login"
import Shopping from "./pages/shopping"
import Order from "./pages/order"

import { CategoryProvider } from "./context/CategoryContext"
import { CartProvider } from "./context/CartContext"
import OrderManagement from "./pages/orderManagement"

function App() {
  return (
    <>
      <BrowserRouter>
        <CategoryProvider>
          <CartProvider>
            <Header />
            <Routes>
              <Route exact path="/" Component={Home}></Route>
              <Route exact path="/:category/" Component={Catalog}></Route>
              <Route
                exact
                path="/category/:pageId"
                Component={Category}
              ></Route>
              <Route exact path="/admin/login" Component={Login}></Route>
              <Route
                exact
                path="/admin/login/:change"
                Component={Login}
              ></Route>
              <Route exact path="/cart" Component={Shopping}></Route>
              <Route exact path="/pedido/:id" Component={Order}></Route>
              <Route exact path="/pedidos" Component={OrderManagement}></Route>
            </Routes>
            <Footer />
          </CartProvider>
        </CategoryProvider>
      </BrowserRouter>
    </>
  )
}

export default App
