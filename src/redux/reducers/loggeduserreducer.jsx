const INITIAL_VALUE = {
    name: '',
    type: ''
}

export function loggeduser (state=INITIAL_VALUE, action){

    switch(action.type){
        case "user":
            return{
                ...state,
                name: action.payload
            }
        case "type":  
        return{
            ...state,
            type: action.payload
        }  
        case "mail":  
        return{
            ...state,
            email: action.payload
        }
        default: 
            return state
    }
}