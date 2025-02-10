import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register(){
    
    const formRef = useRef();
    const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []
    
    

    const [password, setPassword] = useState('')
    const [userdata, setUsrdat] = useState({
        name: '',
        password: '',
        email: '',
        type: 'user',
        cart: [],
        wishlist:[]
      });
 
    
    const [reppassword, setrepPassword] = useState('')

    const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
    const passrgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const namergx = /^[A-Za-z]{3,}$/;
    const [invalmsg, setInvalmsg] = useState("");
    const [valmsg, setvalmsg] = useState("");

    const [isinValid, setIsinValid] = useState({
            email: false,
            password: false,
            name: false,
            reppassword: false,
          });
          const [isValid, setIsValid] = useState({
            email: false,
            password: false,
            name: false,
            reppassword: false,
          });      

    const navigate = useNavigate();

    

    const checkinp = (e) => {

        const value = e.target.value;
        if (e.target.id === "mail")
        {
            const user = usersdata.find(user => user.email === value);
            if (user)
            {
                // e.target.className = "form-control is-invalid"
                setIsValid((e) => ({
                    ...e,
                    email: false,
                  }))
                  setIsinValid((e) => ({
                    ...e,
                    email: true,
                  }))
                setInvalmsg("email already exists")
            }
            else
            {
            if (mailrgx.test(value)) 
                {  
                // e.target.className = "form-control is-valid"
                setIsValid((e) => ({
                    ...e,
                    email: true,
                  }))
                  setIsinValid((e) => ({
                    ...e,
                    email: false,
                  }))
                setvalmsg("Looking Good!!")
                setUsrdat({
                    ...userdata,  
                    email: value,
                  })             
                } 
                else 
                {
                // e.target.className = "form-control is-invalid"
                setIsValid((e) => ({
                    ...e,
                    email: false,
                  }))
                  setIsinValid((e) => ({
                    ...e,
                    email: true,
                  }))
                setInvalmsg("please enter a valid email")
                }
            }
        }
            else if (e.target.id === "name")
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
                setUsrdat({
                    ...userdata,  
                    name: value
                });
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
        else if (e.target.id === "password")
        {
            if (passrgx.test(value))
            {  
            // e.target.className = "form-control is-valid"
            setIsValid((e) => ({
                ...e,
                password: true,
              }))
              setIsinValid((e) => ({
                ...e,
                password: false,
              }))
            setvalmsg("Looking Good!!")
            } 
            else 
            {
            // e.target.className = "form-control is-invalid"
            setIsValid((e) => ({
                ...e,
                password: false,
              }))
              setIsinValid((e) => ({
                ...e,
                password: true,
              }))
            setInvalmsg("Password must be at least 8 characters, have lower and upper letters at least 1")
            }
        }
        else if (e.target.id === "passwordcon")
        {
            if ((password === reppassword) && (reppassword))
            {  
            // e.target.className = "form-control is-valid"
            setIsValid((e) => ({
                ...e,
                reppassword: true,
              }))
              setIsinValid((e) => ({
                ...e,
                reppassword: false,
              }))
            setvalmsg("Looking Good!!")
            setUsrdat({
                ...userdata,  
                password: password
              });
            } 
            else 
            {
            // e.target.className = "form-control is-invalid"
            setIsValid((e) => ({
                ...e,
                reppassword: false,
              }))
              setIsinValid((e) => ({
                ...e,
                reppassword: true,
              }))
            setInvalmsg("Passwords don't match")
            }
        }
        // else if (e.target.id === "busname")
        // {
        //     if (namergx.test(value))
        //     {  
        //     e.target.className = "form-control is-valid"
        //     setUsrdat({
        //         ...userdata,  
        //         businessName: value
        //       });
        //     } 
        //     else 
        //     {
        //     e.target.className = "form-control is-invalid"
        //     setInvalmsg("please enter a valid Business name")
        //     }
        // }    
    }

    const resetval = (e) => {

        const value = e.target.value;
        
            if (value === "") 
            {
                // e.target.className = "form-control"
            }     
    }

    const storeval = (e) => {

        const value = e.target.value;
        if (e.target.id === "password")
            {
                setPassword(value)
            } 
        else if (e.target.id === "passwordcon")  
            {
                setrepPassword(value)
            }      
    }

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
            navigate('/login'); 
            const newusersdata = [...usersdata, userdata] 
            localStorage.setItem('usersdata', JSON.stringify(newusersdata))  
          }

    }
    
    const changepage = () => {
        navigate('/login');
    }

    return(
        <>
            <form className="needs-validation m-5" noValidate style={{width: '25%', border: "1px solid black", padding: "20px", borderRadius: '10px'}} onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className="" >
                    <h1 style={{textAlign: "center"}}>Register</h1>
                    
                    <Input idn="name" inlabl="Name" intype="text" valmsg={valmsg} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.name} isvalid={isValid.name}/>
                    


                    <Input idn="mail" inlabl="E-mail" intype="text" valmsg={valmsg} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} isinvalid={isinValid.email} isvalid={isValid.email}/>


                    <Input idn="password" inlabl="Password" intype="password" valmsg={valmsg} invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval} isinvalid={isinValid.password} isvalid={isValid.password}/>

                    <Input idn="passwordcon" inlabl="Confirm Password" intype="password" valmsg={valmsg} invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval} isinvalid={isinValid.reppassword} isvalid={isValid.reppassword}/>


                    <div className='flex justify-between'>
                        <Button bclr="green" title1="Sign up" mar="15px" clck={valall}/>
                        <Button bclr="blue" title1="go to login" clck={changepage}/>
                    </div>
                </div>
            </form>
        </>
    )

    

}

export default Register