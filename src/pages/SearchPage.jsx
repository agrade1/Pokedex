import { useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../components/PokemonCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const pokemons = useSelector((state) => state.pokemon.list);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 검색 인풋 */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="포켓몬 이름 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* 검색 결과 */}
      {query && filtered.length === 0 && (
        <p className="text-center text-gray-500">검색 결과가 없습니다 😢</p>
      )}

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </div>
  );
}
