import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/table"; 
import Pagination from "../components/pagination"; 


function Products(){

    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [productsPerPage] = useState(10); 

    const fetchProducts = () => {axios.get("https://retoolapi.dev/NRdH0u/products")
      .then((response) => {
        const totalProduacts = response.data;
        setproducts(totalProduacts);
        setTotalPages(Math.ceil(totalProduacts.length / productsPerPage)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching clients:", err);
        setLoading(false);
      });}

  useEffect(() => {
    
      fetchProducts();
  }, []);

  const deleteProductHandler = (e) => {
    axios.delete(`https://retoolapi.dev/NRdH0u/products/${e}`)
            .then((response) => {console.log('Product deleted:', response.data)
            fetchProducts();
            })
            .catch((err) => console.log('Error deleting product:', err))
}

  const indexOfLastClient = currentPage * productsPerPage;
  const indexOfFirstClient = indexOfLastClient - productsPerPage;
  const currentproducts = products.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
    return(
        <div className="my-4">
            <h1 className="text-center mb-4 text-4xl text-black-900 dark:text-white">
            Products List
            </h1>
            {loading ? (
            <p style={{ fontSize: '1.2rem', color: '#7AB2B2' }}>Loading products...</p>
            ) : (
            <>
                <Table products={currentproducts} deleteProductHandler={deleteProductHandler} pagesnumber={currentPage} />
                <div className="flex justify-center items-center">
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    />
                </div>
            </>
            )}
      </div>
    )
}
export default Products