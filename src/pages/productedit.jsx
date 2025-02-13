import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function Editprod(){
    
    const location = useLocation();
    const { state } = location;
    console.log("Received index:", state.indnum);
    const formRef = useRef();
    const { id } = useParams();
    const categories = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", "Automotive"];
    

    const [products, setproducts] = useState([]);
    useEffect(() => {
        axios.get("https://retoolapi.dev/NRdH0u/products")
        .then((responce) => {
            setproducts(responce.data)
            setinpname(responce.data[state.indnum]?.name)
            setinpdesc(responce.data[state.indnum]?.description)
            setinpcat(responce.data[state.indnum]?.category)
            setinpprice(responce.data[state.indnum]?.price)
            setinpquant(responce.data[state.indnum]?.quantaty)
            setinppic(responce.data[state.indnum]?.image)
            setproduct({  
                name: responce.data[state.indnum]?.name,
                price: responce.data[state.indnum]?.price,
                category: responce.data[state.indnum]?.category,
                description: responce.data[state.indnum]?.description,
                quantaty: responce.data[state.indnum]?.quantaty,
                image: responce.data[state.indnum]?.image
              })
        })
        .catch((err) => console.log(err))
    }, [])

    const [inpname, setinpname] = useState('');
    const [inpdesc, setinpdesc] = useState('');
    const [inpcat, setinpcat] = useState('');
    const [inpprice, setinpprice] = useState('');
    const [inpquant, setinpquant] = useState('');
    const [inppic, setinppic] = useState('');

    const [product, setproduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        quantaty: '',
        image:''
      });
 
    
    const [alertVisible, setAlertVisible] = useState(false);
    const descrgx = /^(?!\s)(?!.*\s{2,})[\S\s]{15,}$/
    const price_quantrgx = /^^[1-9]\d*$/;
    const namergx = /^[A-Za-z]{3,}$/;
    const [invalmsg, setInvalmsg] = useState("");
    const [valmsg, setvalmsg] = useState("");

    const handleCategoryChange = (e) => {
        setinpcat(e.target.value); 
        setproduct({
            ...product,  
            category: e.target.value,
          }) 
      };

    const [isinValid, setIsinValid] = useState({
            name: false,
            price: false,
            description: false,
            quantaty: false,
            image: false
          });
    const [isValid, setIsValid] = useState({
            name: false,
            price: false,
            description: false,
            quantaty: false,
            image: false
          });      

    const navigate = useNavigate();

    

    const checkinp = (e) => {

        const value = e.target.value;

        if (e.target.id === "name")
        {
            setinpname(value)
            if (products.filter((_, index) => index !== parseInt((state.indnum))).some(product => product.name.toLowerCase() === value.toLowerCase()))
            {
                // e.target.className = "form-control is-invalid"
                setIsValid((e) => ({
                    ...e,
                    name: false,
                  }))
                  setIsinValid((e) => ({
                    ...e,
                    name: true,
                  }))
                setInvalmsg("product already exists")
                console.log(state.indnum)
                console.log(products[state.indnum])
            }
            else
            {
            if (namergx.test(value)) 
                {  
                // e.target.className = "form-control is-valid"
                setIsValid((e) => ({
                    ...e,
                    name: true,
                  }))
                  setIsinValid((e) => ({
                    ...e,
                    name: false,
                  }))
                setvalmsg("Looking Good!!")
                setproduct({
                    ...product,  
                    name: value,
                  })             
                } 
                else 
                {
                // e.target.className = "form-control is-invalid"
                setIsValid((e) => ({
                    ...e,
                    name: false,
                  }))
                  setIsinValid((e) => ({
                    ...e,
                    name: true,
                  }))
                setInvalmsg("please enter a valid name")
                }
            }
        }
        else if (e.target.id === "desc")
        {
            setinpdesc(value)
            if (descrgx.test(value)) 
            {  
            // e.target.className = "form-control is-valid"
            setIsValid((e) => ({
                ...e,
                description: true,
            }))
            setIsinValid((e) => ({
                ...e,
                description: false,
            }))
            setvalmsg("Looking Good!!")
            setproduct({
                ...product,  
                description: value
            });
            } 
            else 
            {

            setIsValid((e) => ({
                ...e,
                description: false,
            }))
            setIsinValid((e) => ({
                ...e,
                description: true,
            }))
            setInvalmsg("description must be atleast 15 characters long")
            }
        }  
        else if (e.target.id === "price")
        {
            setinpprice(value)
            if (price_quantrgx.test(value))
            {  

                setIsValid((e) => ({
                    ...e,
                    price: true,
                }))
                setIsinValid((e) => ({
                    ...e,
                    price: false,
                }))
                setvalmsg("Looking Good!!")
                setproduct({
                    ...product,  
                    price: parseInt(value)
                })
            }
            else 
            {

                setIsValid((e) => ({
                    ...e,
                    price: false,
                }))
                setIsinValid((e) => ({
                    ...e,
                    price: true,
                }))
                setInvalmsg("please enter a valid number")
            }
        }
        else if (e.target.id === "quant")
        {
            setinpquant(value)
            if (price_quantrgx.test(value))
            {  
            
                setIsValid((e) => ({
                    ...e,
                    quantaty: true,
                    }))
                    setIsinValid((e) => ({
                    ...e,
                    quantaty: false,
                    }))
                setvalmsg("Looking Good!!")
                setproduct({
                    ...product,  
                    quantaty: parseInt(value)
                })
            } 
            else 
            {

            setIsValid((e) => ({
                ...e,
                quantaty: false,
                }))
                setIsinValid((e) => ({
                ...e,
                quantaty: true,
                }))
            setInvalmsg("please enter a valid number")
            }
        }
        else if (e.target.id === "image")
        {
            setinppic(value)
            if (value != "")
            {  
            
                setIsValid((e) => ({
                    ...e,
                    image: true,
                    }))
                    setIsinValid((e) => ({
                    ...e,
                    image: false,
                    }))
                setvalmsg("Looking Good!!")
                setproduct({
                    ...product,  
                    image: value
                })
            } 
            else 
            {

            setIsValid((e) => ({
                ...e,
                image: false,
                }))
                setIsinValid((e) => ({
                ...e,
                image: true,
                }))
            setInvalmsg("please use a valid image source")
            }
        }
           
    }

    const resetval = (e) => {

        const value = e.target.value;
        if (e.target.id === "name")
        {
            setinpname(value)
        }
        else if (e.target.id === "desc")
        {
            setinpdesc(value)
        }
        else if (e.target.id === "price")
        {
            setinpprice(value)
        }
        else if (e.target.id === "quant")   
        {
            setinpquant(value)
        }  
        else if (e.target.id === "image")
        {
            setinppic(value)
        }   
        
        if (value === "") 
        {
            setIsValid((e) => ({
                name: false,
                price: false,
                description: false,
                quantaty: false,
                image: false
            }))
            setIsinValid((e) => ({
                name: false,
                price: false,
                description: false,
                quantaty: false,
                image: false
            }))
        }
                
    }

    // const storeval = (e) => {

    //     const value = e.target.value;
    //     if (e.target.id === "password")
    //         {
    //             setPassword(value)
    //         } 
    //     else if (e.target.id === "passwordcon")  
    //         {
    //             setrepPassword(value)
    //         }      
    // }

    const valall = () => {
        const formElements = formRef.current.elements;

        let formHasError = false;
        
        for (let element of formElements) {

            const e = {target: element}

            checkinp(e);


            if (e.target.value === '' && e.target.tagName.toLowerCase() !== 'button') {
                formHasError = true;
                break;
            }
        }
        
        const hasErrors = Object.values(isinValid).some(value => value === true);

        console.log(hasErrors);
        console.log(formHasError);

        
        if (hasErrors) 
        {
            formHasError = true;
        }

        if (!formHasError) {
                axios.put(`https://retoolapi.dev/NRdH0u/products/${id}`, product)
                .then((response) => {console.log('Product added:', response.data)
                for (let element of formElements) 
                {
                    const e = {target: element}
                    if (e.target.id != 'category')
                    {
                    e.target.value = ""
                    }
                }
                setIsValid((e) => ({
                    name: false,
                    price: false,
                    description: false,
                    quantaty: false,
                    image: false
                }))
                setIsinValid((e) => ({
                    name: false,
                    price: false,
                    description: false,
                    quantaty: false,
                    image: false
                }))
                setAlertVisible(true);
                setTimeout(() => {
                setAlertVisible(false);
                }, 5000);
                navigate('/products')
                })
                .catch((err) => console.log('Error editing product:', err))

            }  
    }
    

    return(
        <>
            <form className="needs-validation m-5" noValidate style={{width: '25%', border: "1px solid black", padding: "20px", borderRadius: '10px'}} onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className="" >
                    <h1 style={{textAlign: "center"}}>Edit product</h1>
                    
                    <Input idn="name" inlabl="Name" intype="text" valmsg={valmsg} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.name} isvalid={isValid.name} inpval={inpname}/>
                    <Input idn="desc" inlabl="Descreption" intype="text" inpval={inpdesc} valmsg={valmsg} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.description} isvalid={isValid.description}/>
                    {/* <Input idn="cat" inlabl="Categories" intype="dropdown" valmsg={valmsg} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.name} isvalid={isValid.name}/> */}
                    <div className="mb-5">

                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category" name="category" value={inpcat} onChange={handleCategoryChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                            ))}
                        </select>
                    </div>
                    <Input idn="price" inlabl="Price" intype="text" valmsg={valmsg} inpval={inpprice} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.price} isvalid={isValid.price}/>
                    <Input idn="quant" inlabl="Quantaty" intype="text" valmsg={valmsg} inpval={inpquant} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.quantaty} isvalid={isValid.quantaty}/>
                    <Input idn="image" inlabl="Image" intype="text" valmsg={valmsg} inpval={inppic} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.image} isvalid={isValid.image}/>
                    


                    <div className='flex justify-between'>
                        <Button bclr="green" title1="Edit product" mar="15px" clck={valall}/>
                        {alertVisible && (
                            <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium"></span>Succesfully edited.
                            </div>
                        )}
                        <Button bclr="blue" title1="Go Back" clck={() => navigate("/products")}/>
                    </div>
                </div>
            </form>
        </>
    )

    

}

export default Editprod