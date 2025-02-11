import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import Login from "./pages/login"
import Register from "./pages/regeister"
import Products from "./pages/products"



function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar/>
            <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/shop" element={<Shop />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/products" element={<Products/>}></Route>
              <Route path="/login" element={<div className="flex items-center justify-center mt-5 mb-auto"><Login/></div>}></Route>
              <Route path="/register" element={<div className="flex items-center justify-center mt-5 mb-auto"><Register/></div>}></Route>
            </Routes>
          </main>  
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App