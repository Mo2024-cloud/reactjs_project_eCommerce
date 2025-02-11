import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import AdminCard from "../components/card";
import { useLocation } from 'react-router-dom';




function ProductDetails(){

    const location = useLocation();
    const { state } = location;
    const index = state ? state.index : null;
    console.log("Received index:", state.index);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setproduct] = useState({})

    useEffect(() => {
        axios.get(`https://retoolapi.dev/NRdH0u/products/${id}`)
        .then((responce) => setproduct(responce.data)
    )
        .catch((err) => console.log(err))
    }, [id])

    const editDetails = (e, indnum) => {
        navigate(`/products/product-details/${e}/edit`,{
            state: { indnum } });
    }


    return(
        <div className="flex justify-center items-center"><AdminCard img={product.image} name={product.name} desc={product.description} cat={product.category} price={product.price} quan={product.quantaty} click={() => editDetails(id, index)}/></div>
    )
}

export default ProductDetails