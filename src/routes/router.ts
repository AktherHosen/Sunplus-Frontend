import Main from "@/layout/main";
import AboutUsPage from "@/pages/about-page";
import Categories from "@/pages/categories/categories";
import Subcategories from "@/pages/categories/subcategories";
import CertificatesPage from "@/pages/certificates-page";
import ChairmanMessagePage from "@/pages/chairmenmessage-page";
import ContactPage from "@/pages/contact-page";
import Home from "@/pages/home/home";
import MediaEventsPage from "@/pages/mediaevents-page";
import NotFound from "@/pages/notFound/not-found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutUsPage },
      { path: "categories", Component: Categories },
      { path: "category/:slug", Component: Subcategories },
      { path: "contact", Component: ContactPage },
      {
        path: "chairman-message",
        Component: ChairmanMessagePage,
      },
      {
        path: "certificates",
        Component: CertificatesPage,
      },
      {
        path: "media-events",
        Component: MediaEventsPage
      }
    ],
  },
]);
