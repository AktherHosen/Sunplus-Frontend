import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="container  mx-auto px-4">
      <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Main;
