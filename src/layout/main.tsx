import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Outlet, useLocation } from "react-router";

const Main = () => {
  const location = useLocation();
  const withoutHeaderFooter = location.pathname.includes("dashboard");

  return (
    <div className="flex flex-col min-h-screen w-full">
      {!withoutHeaderFooter && <Navbar />}
      {/* <div className="container mx-auto px-4 lg:px-0 mt-4">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link to="/" className="flex items-center gap-2">
//                   {" "}
//                   <Home size={15} /> Home
//                 </Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>

//             {paths.map((segment, index) => {
//               const isLast = index === paths.length - 1;
//               return (
//                 <div className="flex items-center">
//                   <BreadcrumbSeparator />
//                   <BreadcrumbItem>
//                     {isLast ? (
//                       <span className="capitalize text-muted-foreground">
//                         {segment.replace("-", " ")}
//                       </span>
//                     ) : (
//                       <BreadcrumbLink asChild>
//                         <p className="capitalize">
//                           {segment.replace("-", " ")}
//                         </p>
//                       </BreadcrumbLink>
//                     )}
//                   </BreadcrumbItem>
//                 </div>
//               );
//             })}
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div> */}
      <main className="flex-1">
        <Outlet />
      </main>

      {!withoutHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
