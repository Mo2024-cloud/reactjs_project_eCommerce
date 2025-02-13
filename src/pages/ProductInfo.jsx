import React, { useEffect, useState } from "react"
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import Products from './products';



const ProductInfo = () => {
    const {id} = useParams()
    const products = useSelector(state => state.product.products)
    const [product,setProduct] = useState()

    useEffect(() => {
        const newProduct = products.find(product => product.id === parseInt(id))
        setProduct(newProduct)
    },[id])

    console.log(typeof(newProduct));
    
    return(
        <div>
            {product.id}
        </div>
        
    )
}

export default ProductInfo