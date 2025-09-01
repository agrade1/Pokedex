import { useDispatch, useSelector } from "react-redux";
import { selectFavoritePokemons, toggleFavorite } from "../RTK/favoritesSlice";

export default function FavoriteButton({ pokemonId, className = "" }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritePokemons);
  const isFavorite = favorites.includes(pokemonId);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleFavorite(pokemonId));
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition ${className} ${
        isFavorite
          ? "bg-rose-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
