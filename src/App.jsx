// App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/login";
import Register from "./pages/regeister";
import Products from "./pages/products";
import ProductDetails from "./pages/productdetails";
import AddProduct from "./pages/add-product";
import Editprod from "./pages/productedit";
import Checkout from "./pages/Checkout";
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import FavoritesPage from "./pages/FavoritesPage";
import FilterData from "./pages/FilterData";
// import ProductInfo from "./pages/ProductInfo";
// import './App.css';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/filter-data" element={<FilterData/>} />
              {/* <Route path="/product/:id" element={<ProductInfo/>} /> */}
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<div className="flex items-center justify-center mt-5 mb-auto"><AddProduct /></div>} />
              <Route path="/products/product-details/:id" element={<ProductDetails />} />
              <Route path="/products/product-details/:id/edit" element={<div className="flex items-center justify-center mt-5 mb-auto"><Editprod /></div>} />
              <Route path="/login" element={<div className="flex items-center justify-center mt-5 mb-auto"><Login /></div>} />
              <Route path="/register" element={<div className="flex items-center justify-center mt-5 mb-auto"><Register /></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
