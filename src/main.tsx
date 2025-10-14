import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import "./index.css";
import { store } from "./redux/store";
import { router } from "./routes/router";
import { AuthProvider } from "./context/auth-context";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <AuthProvider>
     <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
   </AuthProvider>
  </StrictMode>
);
