import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../RTK/pokemonSlice";
import PokemonCard from "../components/PokemonCard";

export default function Main() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>데이터 불러오기 실패</p>;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {list.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}
