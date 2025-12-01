import { OrdersTable } from "@/components/orders/orders-table";
import ProtectedRoute from "@/hooks/protectedRoute";
import Main from "@/layout/main";
import AboutUsPage from "@/pages/about-page";
import AllSubcategoriesPage from "@/pages/all-subcategories-page";
import AllSubcategoryProductPage from "@/pages/all-subcategory-product-page";
import LoginForm from "@/pages/auth/login";
import Categories from "@/pages/categories/categories";
import Subcategories from "@/pages/categories/subcategories";
import CertificatesPage from "@/pages/certificates-page";
import ChairmanMessagePage from "@/pages/chairmenmessage-page";
import ContactPage from "@/pages/contact-page";
import SidebarLayout from "@/pages/dashboard/sidebarLayout";
import Home from "@/pages/home/home";
import MediaEventsPage from "@/pages/mediaevents-page";
import NotFound from "@/pages/notFound/not-found";
import PrivacyPolicyPage from "@/pages/privacy-policy-page";
import ProductPage from "@/pages/products/product-page";
import Profile from "@/pages/profile/profile";
import SubcatProductDetailsPage from "@/pages/subcat-product-details-page";
import TermsAndConditionsPage from "@/pages/terms-and-conditions-page";
import AllUsersPage from "@/pages/users/all-users-page";
import { createBrowserRouter } from "react-router";



const isAdminSubdomain = window.location.hostname.startsWith("admin.");

export const router = createBrowserRouter(
  isAdminSubdomain
    ? [
        {
          path: "/",
          Component: ProtectedRoute, 
          ErrorBoundary: NotFound,
          children: [
            { index: true, Component: LoginForm },
            {
              path: "dashboard",
              Component: SidebarLayout,
              children: [
                { index: true, Component: Profile },
                { path: "products", Component: ProductPage },
                { path: "categories", Component: Categories },
                { path: "sub-categories", Component: Subcategories },
                { path: "orders", Component: OrdersTable },
                { path: "users", Component: AllUsersPage },
              ],
            },
          ],
        },
      ]
    : [
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
      ]
);

