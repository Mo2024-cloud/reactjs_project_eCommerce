import React, { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import { FaTrash, FaTrashAlt } from "react-icons/fa"
import Modal from "../components/Modal"
import ChangeAddress from "../components/changeAddress"
import { removeFromCart } from "../redux/cartSlice"
import { decreaseQuantity, increaseQuantity } from "../redux/reducers/cartSlice"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"



const Cart = () =>{
    const products = useSelector(state => state.product.products)

    const cart = useSelector(state => state.cart)
    const [address,setAddress] = useState('45 Trad ElNile Street')
    const [isModelOpen, setIsModelOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []
    const mail = useSelector((state) => state.user.email);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [productId, setProductId] = useState(null);


    useEffect(() => {
    
          const userIndex = usersdata.findIndex(user => user.email === mail);
      
          if (userIndex !== -1) {
            const updatedUsersData = [...usersdata];
            const user = updatedUsersData[userIndex];
            user.cart = cart.products;
            localStorage.setItem('usersdata', JSON.stringify(updatedUsersData));
          } 
      }, [cart]);
      console.log(cart.products)
      


      const handleModalToggle1 = (id) => {
        setProductId(id);
        setIsModalOpen1((prev) => !prev);
      };
      const handleModalToggle2 = (id) => {
        setProductId(id);
        setIsModalOpen2((prev) => !prev);
      };
      const handleCloseModal = () => {
        setIsModalOpen1(false);
        setIsModalOpen2(false);
      };
      const deletprod = (e) => {
        dispatch(removeFromCart(e))
        handleCloseModal()
    }
    const checkout = async () => 
    {
        try
        {
            const updatePromises = cart.products.map(async (newItem) => 
            {
                const apiItem = products.find(item => item.id === newItem.id);
                console.log(apiItem)
                if (apiItem) 
                {
                    const updatedQuantity = apiItem.quantaty - newItem.quantity;
                    console.log(updatedQuantity)

                    const updatedItemData = {
                        ...apiItem,
                        quantaty: updatedQuantity, 
                    };
                    console.log(updatedItemData)

                    const response = await axios.put(`https://retoolapi.dev/NRdH0u/products/${apiItem.id}`, updatedItemData);
                    console.log('Update Response:', response.data);  
                    return response;
                }
            });

            await Promise.all(updatePromises);

            dispatch(removeFromCart("delete"))
        }  
        catch (error) 
        {
            console.error('Error during checkout:', error);  
        }
    }

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
                                            <div>
                                                <button className="text-red-500 hover:text-red-700" onClick={() => handleModalToggle1(product.id)}>
                                                    <FaTrashAlt/>
                                                </button>
                                                {isModalOpen1 && (
                                                    <div
                                                    className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full h-full"
                                                    >
                                                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4 w-1/3">
                                                        <button
                                                        type="button"
                                                        onClick={handleCloseModal}
                                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                                        >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                        >
                                                            <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                            />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                        </button>
                                                        <div className="text-center">
                                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                Are you sure you want to Remove this product from your cart?
                                                            </h3>
                                                            <button className="text-white bg-red-600 hover:bg-red-800 px-5 py-2.5 rounded-lg" onClick={() => deletprod(productId)}>
                                                                Yes, I'm sure
                                                            </button>
                                                            <button
                                                                onClick={handleCloseModal}
                                                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                                                            >
                                                                No, cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                )}
                                                                </div>
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
                            <div>
                            <button className="w-full bg-red-600 text-white py-2 hover:bg-red-800 rounded"
                            onClick={() => handleModalToggle2()}>Checkout</button>
                            {isModalOpen2 && (
                                                    <div
                                                    className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full h-full"
                                                    >
                                                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4 w-1/3">
                                                        <button
                                                        type="button"
                                                        onClick={handleCloseModal}
                                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                                        >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                        >
                                                            <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                            />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                        </button>
                                                        <div className="text-center">
                                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                Are you sure you want to buy all the items in your cart totaling ({cart.totalPrice.toFixed(2)}) ?
                                                            </h3>
                                                            <button className="text-white bg-red-600 hover:bg-red-800 px-5 py-2.5 rounded-lg" onClick={checkout}>
                                                                Yes, I'm sure
                                                            </button>
                                                            <button
                                                                onClick={handleCloseModal}
                                                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                                                            >
                                                                No, cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                )}

                            </div>
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

