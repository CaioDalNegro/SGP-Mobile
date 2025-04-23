// context/FavoritesContext.js
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (place) => {
    setFavorites((prevFavorites) => [...prevFavorites, place]);
  };

  const removeFavorite = (placeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== placeId)
    );
  };

  const isFavorite = (placeId) => {
    return favorites.some((favorite) => favorite.id === placeId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
