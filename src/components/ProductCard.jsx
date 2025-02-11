import React from "react"
import { FaStar } from "react-icons/fa"
import { addToCart } from "../redux/cartSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useSelector} from 'react-redux'

const ProductCard = ({product}) =>{

    const dispatch = useDispatch()
    const name = useSelector((state) => state.user.name)
    const [alertVisible, setAlertVisible] = useState(false);
    const [notlogged, setnotlogged] = useState(false);

    const handleAddToCart = (e,product) => {

        e.stopPropagation()
        e.preventDefault()
        if (name)
        {   
            dispatch(addToCart(product))
            setAlertVisible(true);
            setTimeout(() => {
            setAlertVisible(false);
            }, 1500);
        } 
        else
        {
            setnotlogged(true);
            setTimeout(() => {
            setnotlogged(false);
            }, 1500);
        }    
        
    }
    return(
        <div className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105">
            <img className="w-full h-48 object-contain mb-4" src={product.image}/>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">${product.price}</p>
            <div className="flex items-center mt-2">
                <FaStar className="text-yellow-500"></FaStar>
                <FaStar className="text-yellow-500"></FaStar>
                <FaStar className="text-yellow-500"></FaStar>
                <FaStar className="text-yellow-500"></FaStar>
            </div>
            <div className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-26 hover:bg-red-700 transition-all"
            onClick={(e) => handleAddToCart(e,product) }>
                <span className="group-hover:hidden">+</span>
                <span className="hidden group-hover:block">Add to Cart</span>
            </div>
      
            {alertVisible && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium"></span>added to your cart.
                </div>
            )}
            {notlogged && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium"></span>Please login to add to cart
                </div>
            )}

        </div>
    )
}

export default ProductCard