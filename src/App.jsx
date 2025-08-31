import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  const menus = [
    { id: 1, title: "Main", to: "/" },
    { id: 2, title: "Search", to: "/search" },
    { id: 3, title: "Favorites", to: "/favorites" },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-6 h-16 bg-slate-900 text-white shadow-md">
        <h1 className="text-xl font-bold tracking-wide">Pokédex</h1>
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
