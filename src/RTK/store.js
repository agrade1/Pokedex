import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    favorites: favoritesReducer,
  },
});

export default store;
