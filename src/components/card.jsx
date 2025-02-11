import Button from "./button"
import { useNavigate } from 'react-router-dom';

function AdminCard(props){
    const navigate = useNavigate();


    return(
        

        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-5">
            <div>
                <img class="w-full rounded-t-lg " src={props.img} alt="" />
            </div>
            <div class="p-5">
                <div href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name : {props.name}</h5>
                </div>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Description : {props.desc}</p>
                <p class="mb-3 font-normal text-purple-600 dark:text-purple-400">Caetogery : {props.cat}</p>
                <div className="flex justify-between items-center">
                    <p class="mb-3 font-normal text-green-600 dark:text-green-400">price : {props.price} EGP</p>
                    <p class="mb-3 font-normal text-red-600 dark:text-red-400">Quantaty : {props.quan}</p>
                </div>
                <div className="flex justify-between items-center">
                    <Button bclr="blue" title1="Edit product" clck={props.click}/>
                    <Button bclr="red" title1="Go back" clck={() => navigate("/products")}/>
                </div>
            </div>
        </div>

    )
}

export default AdminCard