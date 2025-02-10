import React from "react"
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { loggedUser } from '../redux/actions/loggeduseraction';
import { useSelector, useDispatch} from 'react-redux';

const NavBar = () =>{



    const name = useSelector((state) => state.user.name)
    const type = useSelector((state) => state.user.type)

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(loggedUser(''))
    }

    return(
        <nav className="bg=white shadow-md">
            <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">E-Shop</Link>
                </div>
                <div className="relative flex-1 mx-4">
                    <form>
                        <input type="text" placeholder="Search Product" className="w-full border py-2 px-4" />
                        <FaSearch className="absolute top-3 right-3 text-red-500"></FaSearch>
                    </form>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/cart">
                        <FaShoppingCart className="text-lg"/>
                    </Link>
                    {!name && (<Link to="/login" className="hidden md:block">Login</Link>)}
                    {!name && (<p>|</p>)}
                    {name && (<Link className="hover:underline" onClick={logout}>Log Out</Link>)}
                    {!name && (<Link to="/register" className="hidden md:block">Register</Link>)}
                    <button className="block md:hidden"><FaUser /></button>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                {type == "admin" && (<Link to="/products" className="hover:underline">
                    Managment
                </Link>)}
                <Link to="/" className="hover:underline">
                    Shop
                </Link>
                <Link to="/" className="hover:underline">
                    Contact
                </Link>
                <Link to="/" className="hover:underline">
                    About
                </Link>
            </div>
        </nav>
    )
}

export default NavBar