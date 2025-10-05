import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, Outlet, useLocation } from "react-router";

const Main = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="container mx-auto px-4 w-full flex flex-col min-h-screen">
      <Navbar />
      <div className="">
        {paths.length > 0 && (
          <div className="mt-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {paths.map((segment, index) => {
                  const routeTo = "/" + paths.slice(0, index + 1).join("/");
                  const isLast = index === paths.length - 1;
                  return (
                    <div key={routeTo} className="flex items-center">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <span className="capitalize text-muted-foreground">
                            {segment.replace("-", " ")}
                          </span>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={routeTo} className="capitalize">
                              {segment.replace("-", " ")}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
      </div>

      <main className="flex-1 my-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
