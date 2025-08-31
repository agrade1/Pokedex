import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import App from "./App";

const Main = lazy(() => import("./pages/MainPage"));
const Detail = lazy(() => import("./pages/DetailPage"));
const Search = lazy(() => import("./pages/SearchPage"));
const Favorites = lazy(() => import("./pages/FavoritesPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: "detail/:id", element: <Detail /> },
      { path: "search", element: <Search /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
]);

export default router;
