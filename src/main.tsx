import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-context";
import { HelmetProvider } from "react-helmet-async"; 
import "./index.css";
import { persistor, store } from "./redux/store";
import { router } from "./routes/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider> 
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
            <Toaster />
          </PersistGate>
        </Provider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
