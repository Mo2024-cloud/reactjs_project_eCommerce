import React, { useState } from "react"
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"
// import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loggedUser } from '../redux/actions/loggeduseraction';
import { useSelector, useDispatch} from 'react-redux';
import { setSearchTerm } from "../redux/reducers/productSlice";

const NavBar = () =>{

    const favoritesCount = useSelector((state) => state.favorites.favorites.length);

    const products = useSelector(state => state.cart.products)
    const name = useSelector((state) => state.user.name)
    const type = useSelector((state) => state.user.type)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search,setSearch] = useState()

    const handleSearch = (e) =>{
        e.preventDefault()
        dispatch(setSearchTerm(search))
        navigate('/filter-data')
    }

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
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Search Product" className="w-full border py-2 px-4"
                        onChange={(e) => setSearch(e.target.value)} />
                        <FaSearch className="absolute top-3 right-3 text-red-500"></FaSearch>
                    </form>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative">
                        <FaShoppingCart className="text-lg"/>
                        {products.length > 0 && (
                            <span className="absolute top-0 text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white">
                                {products.length}
                            </span>
                        )}
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

                <Link to="/shop" className="hover:underline">shop</Link>

                {type == "admin" && (<Link to="/products" className="hover:underline">
                    Managment
                </Link>)}
                {/* <Link to="/" className="hover:underline">

                    Shop
                </Link> */}
                <Link to="/" className="hover:underline">
                    Contact
                </Link>
                <Link to="/" className="hover:underline">
                    About
                </Link>
                <Link to="/favorites" className="hover:underline">
                    wish List  ({favoritesCount})
                </Link>
            </div>
        </nav>
    )
}

export default NavBar