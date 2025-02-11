

function Input(props){


    return(
        <div className="mb-5">
            <label htmlFor={props.idn} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.inlabl}</label>
            <input type={props.intype} className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${props.isinvalid && 'border-red-500'} ${props.isvalid && 'border-green-500'}`} 
            id={props.idn} placeholder={props.plchold}  value={props.inpval} onBlur={props.blurfun} onChange={props.chgfun} required={props.req}/>

            {props.isinvalid && (<div className="text-red-500 mt-2">{props.invalmsg}</div>)}
            {props.isvalid && (<div className="text-green-500 mt-2">{props.valmsg}</div>)}


        </div>
    )
}

export default Input