import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../RTK/pokemonSlice";
import { useEffect } from "react";

export default function MainPage() {
  const { search } = useOutletContext(); // ✅ App에서 내려준 search 받음
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>데이터 불러오기 실패</p>;

  const filtered = search
    ? list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : list;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {filtered.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      {search && filtered.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          검색 결과가 없습니다 😢
        </p>
      )}
    </section>
  );
}
