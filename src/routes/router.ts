import Main from "@/layout/main";
import AboutUsPage from "@/pages/about-page";
import AllSubcategoriesPage from "@/pages/all-subcategories-page";
import AllSubcategoryProductPage from "@/pages/all-subcategory-product-page";
import Categories from "@/pages/categories/categories";
import CertificatesPage from "@/pages/certificates-page";
import ChairmanMessagePage from "@/pages/chairmenmessage-page";
import ContactPage from "@/pages/contact-page";
import Home from "@/pages/home/home";
import MediaEventsPage from "@/pages/mediaevents-page";
import NotFound from "@/pages/notFound/not-found";
import PrivacyPolicyPage from "@/pages/privacy-policy-page";
import SubcatProductDetailsPage from "@/pages/subcat-product-details-page";
import TermsAndConditionsPage from "@/pages/terms-and-conditions-page";
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
      {
        path: "product/:catSlug/:subCatSlug/:productSlug",
        Component: SubcatProductDetailsPage,
      },
      { path: "terms-and-conditions", Component: TermsAndConditionsPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
    ],
  },
]);
