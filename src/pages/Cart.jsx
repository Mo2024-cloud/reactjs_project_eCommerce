import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import { FaTrash, FaTrashAlt } from "react-icons/fa"
import Modal from "../components/Modal"
import ChangeAddress from "../components/changeAddress"
import { removeFromCart } from "../redux/cartSlice"
import { decreaseQuantity, increaseQuantity } from "../redux/reducers/cartSlice"
import { Navigate, useNavigate } from "react-router-dom"


const Cart = () =>{
    const cart = useSelector(state => state.cart)
    const [address,setAddress] = useState('45 Trad ElNile Street')
    const [isModelOpen, setIsModelOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return(
        <div className="container mx-auto py-8 min-h-95 px-4 md:px-16 lg:px-24">
                {cart.products.length > 0 ?
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
                    <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
                        <div className="md:w-2/3">
                            <div className="flex justify-between border-b items-center mb-4 text-xs font-bold">
                                <p>Products</p>
                                <div className="flex space-x-8">
                                    <p>Products</p>
                                    <p>Quantity</p>
                                    <p>SubTotal</p>
                                    <p>Remove</p>
                                </div>
                            </div>
                            <div>
                                {cart.products.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 border-b">
                                        <div className="md:flex space-x-4 items-center">
                                            <img src={product.image} className="w-16 h-16 object-contain rounded" alt="" />
                                            <div className="flex-1 ml-4">
                                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                            </div>
                                        </div>
                                        <div className="flex space-x-12 items-center">
                                            <p>${product.price}</p>
                                            <div className="flex items-center justify-center border">
                                                <button className="text-xl font-bold px-1.5 border-r"
                                                onClick={() => dispatch(decreaseQuantity(product.id))}>-</button>
                                                <p className="text-xl px-2">{product.quantity}</p>
                                                <button className="text-xl px-1 border-l"
                                                onClick={() => dispatch(increaseQuantity(product.id))}>+</button>
                                            </div>
                                            <p>${(product.quantity * product.price).toFixed(2)}</p>
                                            <button className="text-red-500 hover:text-red-700" onClick={() => dispatch(removeFromCart(product.id))}>
                                                <FaTrashAlt/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                                
                        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-sm font-semibold mb-5">Cart Totals</h3>
                            <div className="flex justify-between mb-5 border-b pb-1">
                                <span className="text-sm">Total Items:</span>
                                <span>{cart.totalQuantity}</span>
                            </div>
                            <div className="mb-4 border-b pb-2">
                                <p>Shipping:</p>
                                <p className="ml-2">Shipping to{" "}</p>
                                <span className="text-xs font-bold">{address}</span>
                                <button className="text-blue-500 hover:underline mt-1 ml-2" onClick={() => setIsModelOpen(true)}>Change Address</button>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span>Total Price:</span>
                                <span>{cart.totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-red-600 text-white py-2 hover:bg-red-800 rounded"
                            onClick={() => navigate('/checkout')}>Checkout</button>
                        </div>
                    </div>
                    <Modal isModelOpen={isModelOpen} setIsModelOpen = {setIsModelOpen}>
                        <ChangeAddress setAddress={setAddress} setIsModelOpen={setIsModelOpen}/>
                    </Modal>
                </div>
                :<div className="flex justify-center">
                    <h1 className="text-red-600">There is no Items in Cart</h1>
                </div>}
        </div>
    )
}

export default Cart

