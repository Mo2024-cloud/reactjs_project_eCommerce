import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { loggedUser } from '../redux/actions/loggeduseraction';
import { Usertype } from '../redux/actions/loggeduseraction';
import { Usermail } from '../redux/actions/loggeduseraction';
import { Link } from 'react-router-dom';
import { setCart } from "../redux/reducers/cartSlice";
import { setFavorites } from '../redux/actions/actionsFav';


function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []
    const dispatch = useDispatch();
    const [invalmsg, setInvalmsg] = useState("");
    const [isinvalid, setIsValid] = useState({
        email: false,
        password: false,
      });


    const formRef = useRef();

    const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/

    const navigate = useNavigate();

    const checkinp = (e) => {

        const value = e.target.value;
        if (e.target.id === "mail")
        {
            if (mailrgx.test(value)) 
                {  
                // e.target.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                setemail(value)
                setIsValid((e) => ({
                    ...e,
                    email: false,
                  }))
                } 
                else 
                {
                // e.target.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 is-invalid"
                setInvalmsg("please enter a valid mail")
                setIsValid((e) => ({
                    ...e,
                    email: true,
                  }))
                
                }
        }
        else if (e.target.id === "password")
        {
            if (value.length >= 8) 
            {  
            // e.target.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            setPassword(value)
            setIsValid((e) => ({
                ...e,
                password: false,
              }))
            } 
            else 
            {
            // e.target.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 is-invalid"
            // setInvalmsg("Please enter a valid password")
            setIsValid((e) => ({
                ...e,
                password: true,
              }))
            }
        }  
    }

    const resetval = (e) => {

        const value = e.target.value;
        
            if (value === "") 
            {
                setIsValid((e) => ({
                    ...e,
                    email: false,
                    password: false
                  }))
            }     
    }

    const valall = () => {
        const formElements = formRef.current.elements;

        // for (let element of formElements) {
        //     const e = 
        //     {
        //       target: element
        //     }
        //     checkinp(e)
        // }
        const user = usersdata.find(user => user.email.toLowerCase() === email.toLowerCase());
        if (user) 
        {
            setIsValid((e) => ({
                ...e,
                email: false,
              }))
            if (user.password === password)
                if(user.type == "admin")
                {
                    dispatch(loggedUser(user.name))
                    dispatch(Usertype(user.type))
                    dispatch(Usermail(user.email))
                    navigate('/products'); 
                    const userCart = user.cart || [];
                    const totalQuantity = userCart.reduce((acc, product) => acc + product.quantity, 0);
                    const totalPrice = userCart.reduce((acc, product) => acc + product.totalPrice, 0);
                    if(userCart){
                    dispatch(setCart({ products: userCart, totalQuantity, totalPrice }));
                    }else{
                    dispatch(setCart({ products: [], totalQuantity: 0, totalPrice: 0 }));
                    } 
                    const userwish = user.wishlist || [];
  
                    dispatch(setFavorites(userwish));
                    // }else{
                    // dispatch(setFavorites([]));
                    // }   
                      
                }
                else
                {
                    dispatch(loggedUser(user.name))
                    dispatch(Usertype(user.type))
                    dispatch(Usermail(user.email))
                    navigate('/');
                    const userCart = user.cart || [];
                    const totalQuantity = userCart.reduce((acc, product) => acc + product.quantity, 0);
                    const totalPrice = userCart.reduce((acc, product) => acc + product.totalPrice, 0);
                    if(userCart){
                    dispatch(setCart({ products: userCart, totalQuantity, totalPrice }));
                    }else{
                    dispatch(setCart({ products: [], totalQuantity: 0, totalPrice: 0 }));
                    } 
                    const userwish = user.wishlist || [];
                    dispatch(setFavorites(userwish));
                }
            else
            {
                setIsValid((e) => ({
                    ...e,
                    password: true,
                  }))
                setInvalmsg("wrong password")
            }

        } 
        else 
        {
            setIsValid((e) => ({
                ...e,
                email: true,
              }))
            setInvalmsg("email not found")
        }
    }

    // const changepage = () => {
    //     navigate.push('/register');
    //   }
    

    return(
        <>
            <form className="max-w-sm mx-auto" noValidate style={{width: '20%', border: "1px solid black", padding: "20px", borderRadius: '10px'}} onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className="" >
                    <h1 className="text-blue-600 text-4xl" style={{textAlign: "center"}}>Login</h1>
                    
                    <Input idn="mail" inlabl="E-mail" intype="text" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinvalid.email}/>


                    <Input idn="password" inlabl="Password" intype={showPassword ? "text" : "password"} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinvalid.password}/>
                    <div className='flex items-center mb-3 space-x-2'>
                        <input type='checkbox'  onChange={() => setShowPassword((prev) => !prev)}/>
                        <p className='mb-0' style={{marginLeft: "10px"}}>Show Password</p>
                    </div>
                    
                    <Button bclr="blue" title1="login" mar="15px" wid="100%" clck={valall} valmsg="success" invalmsg="Please check the errors"/>
                    <p>Don't have an account? sign up <Link to={'/register'} className="text-blue-500 underline">here</Link></p>
                    {/* <Button bclr="success" title1="Register" wid="100%" clck={changepage}/> */}
                </div>
            </form>
        </>
    )

    

}

export default Login