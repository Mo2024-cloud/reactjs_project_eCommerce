import React, { useEffect } from "react"
import { Categories, mockData } from "../assets/mockData"
import HeroImage from "../assets/images/bg_hero.webp"
import InfoSection from "../components/infoSection"
import CategorySection from "../components/categorySection"
import { setProducts } from "../redux/reducers/cartSlice"
import { useDispatch, useSelector } from "react-redux"

// bg_hero.webp
const Home = () =>{
    // const dispatch = useDispatch()
    // const products = useSelector(state => state.product)
    // useEffect(()=>{
    //     dispatch(setProducts(mockData))
    // },[])
    return(
        <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
            <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-2">
                <div className="w-full md:w-3/12">
                        <div className="bg-red-600 text-white text-xs font-bold px-2 py-2.5">Shop Categories</div>
                        <ul className="space-y-4 bg-gray-100 p-3 border">
                            {Categories.map((categorie, index)=>(
                                <li key={index} className="flex items-center text-sm font-medium">
                                    <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
                                    {categorie}
                                </li>
                            ))}
                        </ul>
                </div>
                    
                <div className="w-full md:w-9/12 mt-8 md:mt-0 h-96 relative">
                        <img src={HeroImage} alt="" className="w-full"/>
                        <div className="absolute top-16 left-8">
                            <p className="text-white mb-4">Code with Mohamed</p>
                            <h2 className="text-blue-800 text-3xl font-bold">welcome To <span className="text-red-600">E-Shop</span></h2>
                            <p className="text-xl mt-2.5 font-bold text-white">Millions Products</p>
                            <button className="bg-red-600 px-8 py-1.5 text-white mt-4 hover:bg-red-700 transform transition-transform duration-300 hover:scale-105">Shop Now</button>
                        </div>
                </div>
            </div>
            <InfoSection/>
            <CategorySection/>
            {/* <div>
                <h2>Top Products</h2>
                <div>

                </div>
            </div> */}
        </div>
        
    )
}

export default Home