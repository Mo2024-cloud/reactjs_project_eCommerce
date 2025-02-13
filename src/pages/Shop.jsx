import React from "react"
import { useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import { useState, useEffect } from "react";
import Pagination from "../components/pagination"; 


const Shop = () =>{
    const products = useSelector(state => state.product.products)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [productsPerPage] = useState(10); 

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / productsPerPage));
      }, [products, productsPerPage]);

    const indexOfLastClient = currentPage * productsPerPage;
    const indexOfFirstClient = indexOfLastClient - productsPerPage;
    const currentproducts = products.slice(indexOfFirstClient, indexOfLastClient);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    return(
        <div className="mx-auto py-12 px-4 md:px-16 lg:px-24">
                <h2 className="text-2xl font-bold mb-6 text-center">Shop</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
                    {currentproducts.map(((product) => (
                        <ProductCard product={product}/>
                    )))}
                </div>
                <div className="flex justify-center items-center">
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    />
                </div>
        </div>
    )
}

export default Shop