import { Link } from "react-router";

export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  return (
    <Link
      to={`/detail/${pokemon.id}`}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-transform duration-200"
    >
      {/* 이미지 영역 */}
      <div className="bg-gradient-to-tr from-slate-100 to-slate-200 w-28 h-28 rounded-full flex items-center justify-center shadow-inner">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-20 h-20 drop-shadow-md"
        />
      </div>

      {/* 이름 + ID */}
      <h3 className="capitalize font-bold text-lg mt-3 text-slate-800 tracking-wide">
        {pokemon.name} / {pokemon.name_ko}
      </h3>
      <p className="text-xs text-gray-500">#{pokemon.id}</p>

      {/* 타입 뱃지 */}
      <div className="flex gap-2 mt-3 flex-wrap justify-center">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize text-white bg-pokemon-${t.type.name}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
