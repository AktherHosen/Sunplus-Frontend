import Main from "@/layout/main";
import AboutUsPage from "@/pages/about-page";
import Categories from "@/pages/categories/categories";
import Subcategories from "@/pages/categories/subcategories";
import SubcategoryProductPage from "@/pages/categories/subcategory-product-page";
import CertificatesPage from "@/pages/certificates-page";
import ChairmanMessagePage from "@/pages/chairmenmessage-page";
import ContactPage from "@/pages/contact-page";
import SidebarLayout from "@/pages/dashboard/sidebarLayout";
import Home from "@/pages/home/home";
import MediaEventsPage from "@/pages/mediaevents-page";
import NotFound from "@/pages/notFound/not-found";
import ProductDetailsPage from "@/pages/products/product-details";
import ProductPage from "@/pages/products/product-page";
import { createBrowserRouter } from "react-router";
// import DashboardHome from "@/pages/dashboard/dashboardHome"; // example dashboard page
// import InboxPage from "@/pages/dashboard/inboxPage"; // add other dashboard pages
// import CalendarPage from "@/pages/dashboard/calendarPage";
// import SettingsPage from "@/pages/dashboard/settingsPage";

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
      { path: "chairman-message", Component: ChairmanMessagePage },
      { path: "certificates", Component: CertificatesPage },
      { path: "media-events", Component: MediaEventsPage },
      { path: "products", Component: ProductPage},
      {
        path: "category/:categorySlug/:subSlug",
        Component: SubcategoryProductPage,
      },
      {
        path: "/:categorySlug/:subSlug/:productSlug",
        Component: ProductDetailsPage,
      },
      {
        path: "dashboard",
        Component: SidebarLayout,
        children: [
          // { index: true, Component: DashboardHome },
          // { path: "inbox", Component: InboxPage },
          // { path: "calendar", Component: CalendarPage },
          // { path: "settings", Component: SettingsPage },
        ],
      },
    ],
  },
]);
