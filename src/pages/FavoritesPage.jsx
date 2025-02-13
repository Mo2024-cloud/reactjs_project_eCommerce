// FavoritesPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/actions/actionsFav';
import { useEffect } from 'react';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []
  const mail = useSelector((state) => state.user.email);
//   const favorites = useSelector((state) => state.favorites.favorites);


  useEffect(() => {
  
      const userIndex = usersdata.findIndex(user => user.email === mail);
  
      if (userIndex !== -1) {
        const updatedUsersData = [...usersdata];
        const user = updatedUsersData[userIndex];
        user.wishlist = favorites;
        localStorage.setItem('usersdata', JSON.stringify(updatedUsersData));
      } 
  }, [favorites]);


  return (
    <div className="mt-4 mb-5">
      <h2 className="mb-4 text-center text-2xl font-bold">Favorites</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div className="bg-white p-4 shadow rounded relative border" key={product.id}>
              <img
                src={product.image}
                className="w-full h-48 object-contain mb-4"
                alt={product.name}
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">${product.price}</p>
              <button
                className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-26 hover:bg-red-700 transition-all"
                onClick={() => dispatch(removeFromFavorites(product.id))}
              >
                <span className="group-hover:hidden">X</span>
                <span className="hidden group-hover:block">Remove</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <h3 className="text-red-600">No favorite products added yet.</h3>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
