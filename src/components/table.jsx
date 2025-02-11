import { useNavigate } from 'react-router-dom';
import Button from "./button";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Table({ products, deleteProductHandler, pagesnumber}) {

    const [productId, setProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


  const handleModalToggle = (id) => {
    setProductId(id);
    setIsModalOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    const navigate = useNavigate();
  
    const moreDetails = (e, index) => {
        navigate(`/products/product-details/${e}`,{
            state: { index } });
    }

    const deletprod = (e) => {
        deleteProductHandler(e)
        handleCloseModal()
    }
  
  return (
    <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center m-5">
            <table className="table-fixed w-3/4 border border-[#4D869C] text-[#4D869C]" style={{ borderColor: "#4D869C", color: "#4D869C" }}>
            <thead style={{ backgroundColor: "#EEF7FF", color: "#4D869C" }}>
                <tr>
                <th className="px-4 py-2 border border-[#4D869C] text-center">Name</th>
                <th className="px-4 py-2 border border-[#4D869C] text-center">Price</th>
                <th className="px-4 py-2 border border-[#4D869C] text-center">Quantity in Stock</th>
                <th className="px-4 py-2 border border-[#4D869C] text-center">Options</th>
                </tr>
            </thead>
            <tbody style={{  }}>
                {products.map((product, index) => (
                <tr>
                    <td className="px-4 py-2 border border-[#7AB2B2] text-center">{product.name}</td>
                    <td className="px-4 py-2 border border-[#7AB2B2] text-center">{product.price}</td>
                    <td className="px-4 py-2 border border-[#7AB2B2] text-center">{product.quantaty}</td>
                    <td className="flex justify-around items-center px-4 py-2 border border-[#7AB2B2] text-center">
                        <Button bclr="blue" title1="More detials" clck={() => moreDetails(product.id, pagesnumber > 1 ? `${pagesnumber - 1}${index}` : `${index}`)}/>
                        
                        
                        <div>
                            <Button bclr="red" title1="remove product" clck={() => handleModalToggle(product.id)}/>

                            {isModalOpen && (
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
                                            Are you sure you want to Remove this product?
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

                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            
        </div>
     <Button bclr="green" title1="Add product" clck={() => navigate("/add-product")}/>
     </div>   
  );
}

export default Table;