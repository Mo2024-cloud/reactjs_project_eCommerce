// ProductCard.js
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { addToCart} from "../redux/reducers/cartSlice";
import { addToFavorites, removeFromFavorites } from "../redux/actions/actionsFav";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);
  const mail = useSelector((state) => state.user.email);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites.favorites);
  const [alertVisible, setAlertVisible] = useState(false);
  const [notlogged, setNotLogged] = useState(false);

  const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []

  const isFavorite = favorites.some((favProduct) => favProduct.id === product.id);

  // useEffect(() => {
  //   const userIndex = usersdata.findIndex(user => user.email === mail);

  //   if (userIndex !== -1) {
  //     const user = usersdata[userIndex];
  //     const userCart = user.cart || [];
  //     const totalQuantity = userCart.reduce((acc, product) => acc + product.quantity, 0);
  //     const totalPrice = userCart.reduce((acc, product) => acc + product.totalPrice, 0);

  //     dispatch(setCart({ products: userCart, totalQuantity, totalPrice }));
  //   } else {
  //     dispatch(setCart({ products: [], totalQuantity: 0, totalPrice: 0 }));
  //   }
  // }, [mail, usersdata]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    if (name) {
      dispatch(addToCart(product));
      console.log(product)
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

  useEffect(() => {

      const userIndex = usersdata.findIndex(user => user.email === mail);
  
      if (userIndex !== -1) {
        const updatedUsersData = [...usersdata];
        const user = updatedUsersData[userIndex];
        user.cart = cart.products;
        localStorage.setItem('usersdata', JSON.stringify(updatedUsersData));
      } 
  }, [cart]);

  useEffect(() => {

    const userIndex = usersdata.findIndex(user => user.email === mail);

    if (userIndex !== -1) {
      const updatedUsersData = [...usersdata];
      const user = updatedUsersData[userIndex];
      user.wishlist = favorites;
      localStorage.setItem('usersdata', JSON.stringify(updatedUsersData));
    } 
}, [favorites]);

  const handleFavoriteToggle = () => {
    if (name) 
    {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id));
      } else {
        dispatch(addToFavorites(product));
      }
    }
    else
    {
      setNotLogged(true);
      setTimeout(() => {
        setNotLogged(false);
      }, 1500);
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
      <div className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-blue-600 group text-white text-sm rounded-full hover:w-26 hover:bg-blue-700 transition-all" onClick={handleFavoriteToggle}>
        <span className="group-hover:hidden text-xl">{isFavorite ? '⭐' : '✩'}</span>
        <span className="hidden group-hover:block">Add to wishlist</span>
      </div>
      {alertVisible && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Added to your cart.</span>
        </div>
      )}
      {notlogged && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Please log in to add to cart/wishlist</span>
        </div>
      )}
    </div>
    
  );
};

export default ProductCard;
