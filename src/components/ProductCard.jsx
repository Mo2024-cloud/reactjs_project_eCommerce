// ProductCard.js
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/reducers/cartSlice";
import { addToFavorites, removeFromFavorites } from "../redux/actions/actionsFav";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);
  const favorites = useSelector((state) => state.favorites.favorites);
  const [alertVisible, setAlertVisible] = useState(false);
  const [notlogged, setNotLogged] = useState(false);

  const isFavorite = favorites.some((favProduct) => favProduct.id === product.id);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    if (name) {
      dispatch(addToCart(product));
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1500);
    } else {
      setNotLogged(true);
      setTimeout(() => {
        setNotLogged(false);
      }, 1500);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    
    <div className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105">
      <img className="w-full h-48 object-contain mb-4" src={product.image} alt={product.name} />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <div className="flex items-center mt-2">
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
      </div>
      <div className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-26 hover:bg-red-700 transition-all"
        onClick={(e) => handleAddToCart(e, product)}>
        <span className="group-hover:hidden">+</span>
        <span className="hidden group-hover:block">Add to Cart</span>
      </div>
      <button className="absolute top-2 right-2" onClick={handleFavoriteToggle}>
        {isFavorite ? '⭐' : '✩'}
      </button>
      {alertVisible && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Added to your cart.</span>
        </div>
      )}
      {notlogged && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Please log in to add to cart</span>
        </div>
      )}
    </div>
    
  );
};

export default ProductCard;
