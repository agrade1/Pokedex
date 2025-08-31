import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store";
import App from "./App";
import "./index.css";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "detail/:id", element: <DetailPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "favorites", element: <FavoritesPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);
