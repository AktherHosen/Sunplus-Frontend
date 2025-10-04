import Main from "@/layout/main";
import Home from "@/pages/home/home";
import NotFound from "@/pages/notFound/not-found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    ErrorBoundary: NotFound,
    children: [{ index: true, Component: Home }],
  },
]);
