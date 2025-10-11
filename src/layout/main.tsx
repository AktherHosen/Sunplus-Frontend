import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

const Main = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-0 mt-6">
        {/* {paths.length > 0 && ( */}
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-2">
                    {" "}
                    <Home size={15} /> Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {paths.map((segment, index) => {
                // const routeTo = "/" + paths.slice(0, index + 1).join("/");
                const isLast = index === paths.length - 1;
                return (
                  <div className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <span className="capitalize text-muted-foreground">
                          {segment.replace("-", " ")}
                        </span>
                      ) : (
                        <BreadcrumbLink asChild>
                          <p className="capitalize">
                            {segment.replace("-", " ")}
                          </p>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* )} */}
      </div>

      <main className="flex-1 my-6 container mx-auto px-4 lg:px-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
