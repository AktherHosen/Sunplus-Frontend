import Main from "@/layout/main";
import About from "@/pages/about/about";
import Categories from "@/pages/categories/categories";
import Subcategories from "@/pages/categories/subcategories";
import Home from "@/pages/home/home";
import NotFound from "@/pages/notFound/not-found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "categories", Component: Categories },
      { path: "category/:slug", Component: Subcategories },
    ],
  },
]);
