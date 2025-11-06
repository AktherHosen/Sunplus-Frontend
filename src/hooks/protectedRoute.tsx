import Loader from "@/components/loader";
import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if(loading){
    return <Loader/>;
  }
  if (user === null) {
    return <Navigate to="/login"/>;
  }
  
  return <Outlet />;
}


