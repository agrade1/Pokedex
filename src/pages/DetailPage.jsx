import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../RTK/favoritesSlice";
import FavoriteButton from "../components/FavoriteButton";

export default function DetailPage() {
  const { id } = useParams();
  const pokemon = useSelector((state) =>
    state.pokemon.list.find((p) => p.id === Number(id))
  );
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (!pokemon) return <p>데이터 없음</p>;

  const isFavorite = favorites.includes(pokemon.id);

  if (!pokemon) {
    return (
      <p className="p-6 text-center">
        해당 포켓몬 데이터를 찾을 수 없습니다 😢
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-xl border border-gray-200 p-8">
      {/* 헤더 */}
      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 drop-shadow-md"
        />
        <h2 className="flex items-end text-4xl font-extrabold capitalize text-slate-800 my-4">
          {pokemon.name}
          <small className="text-lg text-gray-500">#{pokemon.id}</small>
        </h2>

        {/* 찜하기 버튼 */}
        <FavoriteButton pokemonId={pokemon.id} />
      </div>

      {/* 타입 */}
      <div className="mt-6 text-center">
        <h3 className="font-semibold text-lg mb-2">타입</h3>
        <div className="flex justify-center gap-2 flex-wrap">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`px-4 py-1 rounded-full text-sm font-semibold capitalize text-white bg-pokemon-${t.type.name}`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      {/* 능력치 */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-3 text-center">능력치</h3>
        <ul className="space-y-3">
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">
                  {s.stat.name.replace("-", " ")}:
                </span>
                <span>{s.base_stat}</span>
              </div>
              {/* progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 bg-emerald-500 rounded-full"
                  style={{ width: `${(s.base_stat / 255) * 100}%` }} // 255 기준 비율
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
