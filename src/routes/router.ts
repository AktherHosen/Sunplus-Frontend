import Main from "@/layout/main";
import AboutUsPage from "@/pages/about-page";
import AllSubcategoriesPage from "@/pages/all-subcategories-page";
import AllSubcategoryProductPage from "@/pages/all-subcategory-product-page";
import Categories from "@/pages/categories/categories";
import SubcategoryProductPage from "@/pages/categories/subcategory-product-page";
import CertificatesPage from "@/pages/certificates-page";
import ChairmanMessagePage from "@/pages/chairmenmessage-page";
import ContactPage from "@/pages/contact-page";
import SidebarLayout from "@/pages/dashboard/sidebarLayout";
import Home from "@/pages/home/home";
import MediaEventsPage from "@/pages/mediaevents-page";
import NotFound from "@/pages/notFound/not-found";
import ProductPage from "@/pages/products/product-page";
import SubcatProductDetailsPage from "@/pages/subcat-product-details-page";
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
      { path: "category/:slug", Component: AllSubcategoriesPage },
      { path: "product/:slug", Component: AllSubcategoryProductPage },
      { path: "contact", Component: ContactPage },
      { path: "chairman-message", Component: ChairmanMessagePage },
      { path: "certificates", Component: CertificatesPage },
      { path: "media-events", Component: MediaEventsPage },
      { path: "products", Component: ProductPage },
      {
        path: "category/:categorySlug/:subSlug",
        Component: SubcategoryProductPage,
      },
      // {
      //   path: "/:categorySlug/:subSlug/:productSlug",
      //   Component: ProductDetailsPage,
      // },
      {
        path: "product/:catSlug/:subCatSlug/:productSlug",
        Component: SubcatProductDetailsPage,
      },
      {
        path: "dashboard",
        Component: SidebarLayout,
        children: [
          { path: "/dashboard/products", Component: ProductPage },
          { path: "/dashboard/categories", Component: Categories },
        ],
      },
    ],
  },
]);
