import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../RTK/pokemonSlice";

export default function MainPage() {
  const [sp] = useSearchParams();
  const query = (sp.get("query") ?? "").trim().toLowerCase(); // ✅ URL 파라미터에서 query 읽기

  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>데이터 불러오기 실패</p>;

  // 검색어 기반 필터링
  const filtered = query
    ? list.filter((p) => p.name.toLowerCase().includes(query))
    : list;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {filtered.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      {query && filtered.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          검색 결과가 없습니다 😢
        </p>
      )}
    </section>
  );
}
