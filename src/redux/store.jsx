import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice"
import productSlice from "./reducers/productSlice"
import { loggeduser } from "./reducers/loggeduserreducer";
import favoritesReducer from '../redux/reducers/favoritesReducer';

const store = configureStore({
    reducer:{
        cart: cartSlice,
        product: productSlice,
        favorites: favoritesReducer,
        user : loggeduser
    }
})

export default store
