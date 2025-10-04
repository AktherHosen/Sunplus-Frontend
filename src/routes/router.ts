import Main from "@/layout/main";
import Home from "@/pages/home/home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [{ index: true, Component: Home }],
  },
]);
