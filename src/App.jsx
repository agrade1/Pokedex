import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function useDebounce(value, delay = 1000) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function App() {
  const menus = [
    { id: 1, title: "Main", to: "/" },
    { id: 2, title: "Favorites", to: "/favorites" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [input, setInput] = useState(params.get("query") ?? "");
  const debounced = useDebounce(input, 1000);

  // ✅ 검색어가 debounce되면 URL에 반영
  useEffect(() => {
    if (debounced) {
      navigate(`/?query=${debounced}`);
    } else {
      navigate(`/`);
    }
  }, [debounced, navigate]);

  return (
    <>
      <header className="flex items-center justify-between px-6 h-16 bg-slate-900 text-white shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-wide">Pokédex</h1>

          {/* 검색 인풋 */}
          <input
            type="text"
            placeholder="포켓몬 검색..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-6 px-3 py-1 rounded-lg text-black"
          />
        </div>
        <nav>
          <ul className="flex gap-6">
            {menus.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? "text-emerald-400 font-semibold"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}
