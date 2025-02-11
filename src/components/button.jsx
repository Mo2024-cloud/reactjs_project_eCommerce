function Button(props){
    return(
        <>
            <div>
                <button className={`focus:outline-none text-white bg-${props.bclr}-700 hover:bg-${props.bclr}-800 focus:ring-4 focus:ring-${props.bclr}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-${props.bclr}-600 dark:hover:bg-${props.bclr}-700 dark:focus:ring-${props.bclr}-800`} style={{height:"auto", width:props.wid, marginBottom: props.mar}} onClick={props.clck}> {props.title1}</button>  

            </div>    
        </>
    )
}

export default Button