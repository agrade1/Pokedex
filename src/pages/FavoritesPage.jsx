import { useSelector } from "react-redux";
import PokemonCard from "../components/PokemonCard";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites);
  const pokemons = useSelector((state) => state.pokemon.list);

  // 찜한 포켓몬만 필터링
  const favoritePokemons = pokemons.filter((p) => favorites.includes(p.id));

  if (favoritePokemons.length === 0) {
    return <p className="p-6 text-center">아직 찜한 포켓몬이 없어요 😢</p>;
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
      {favoritePokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}
