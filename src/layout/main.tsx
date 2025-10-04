import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="container  mx-auto px-4">
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default Main;
