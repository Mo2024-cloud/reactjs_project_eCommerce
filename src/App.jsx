import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/login"
import Register from "./pages/regeister"
import Products from "./pages/products"


function App() {

  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/login" element={<div className="flex items-center justify-center mt-5"><Login/></div>}></Route>
          <Route path="/register" element={<div className="flex items-center justify-center mt-5"><Register/></div>}></Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App