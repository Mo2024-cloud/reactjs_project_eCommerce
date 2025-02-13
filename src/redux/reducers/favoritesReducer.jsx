// favoritesReducer.js
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, SET_FAVORITES } from '../actions/actionsFav';

const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state, 
        favorites: action.payload
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
