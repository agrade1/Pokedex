import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../RTK/pokemonSlice";
import { getRegExp } from "korean-regexp";

export default function MainPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();

  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>데이터 불러오기 실패</p>;

  let filtered = list;

  if (query) {
    const regex = getRegExp(query, { initialSearch: true });

    filtered = list.filter((p) => {
      // ✅ 영어 이름 검사
      if (p.name.toLowerCase().includes(query.toLowerCase())) return true;
      // ✅ 한글 이름이 있으면 거기도 검사
      if (p.name_ko && regex.test(p.name_ko)) return true;
      return false;
    });
  }

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
