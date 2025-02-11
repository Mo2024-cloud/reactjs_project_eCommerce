import React from "react"
import { FaHeadset, FaLock, FaShippingFast, FaTag } from "react-icons/fa"
import { FaMoneyBill1Wave } from "react-icons/fa6"

const InfoSection = () =>{
    const infoItems = [
        {
            icon:<FaShippingFast className="text-3xl text-red-600"/>,
            title:"Free Shipping",
            description:'Get Your Orders Delivered with no Extra Cost'
        },
        {
            icon:<FaHeadset className="text-3xl text-red-600"/>,
            title:"Support 24h",
            description:'Get Your Orders Delivered with no Extra Cost'
        },
        {
            icon:<FaMoneyBill1Wave className="text-3xl text-red-600"/>,
            title:"100% Money Back",
            description:'Get Your Orders Delivered with no Extra Cost'
        },
        {
            icon:<FaLock className="text-3xl text-red-600"/>,
            title:"Payment Secure",
            description:'Get Your Orders Delivered with no Extra Cost'
        },
        {
            icon:<FaTag className="text-3xl text-red-600"/>,
            title:"Discount",
            description:'Get Your Orders Delivered with no Extra Cost'
        },
    ];
    return(
        <div className="bg-white pb-8 pt-45">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {infoItems.map((item,index)=>(
                    <div key={index} className="flex flex-col items-center text-center p-4 border border-gray-500 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                        {item.icon}
                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfoSection