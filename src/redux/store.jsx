import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice"
import productSlice from "./reducers/productSlice"
import { loggeduser } from "./reducers/loggeduserreducer";

const store = configureStore({
    reducer:{
        cart: cartSlice,
        product: productSlice,
        user : loggeduser
    }
})

export default store