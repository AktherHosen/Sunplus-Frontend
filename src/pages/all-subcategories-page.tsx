import Loader from "@/components/loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetCategoryBySlugQuery } from "@/redux/api/baseApi";
import { Link, useNavigate, useParams } from "react-router";

const AllSubcategoriesPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoryBySlugQuery(slug!);

  if (isLoading) return <Loader />;
  if (isError) return <div>Failed to load category data.</div>;

  const category = data?.data || {};
  const subcategories = category.subcategories || [];
  const banners = category.banners || [];

  return (
    <div className="container mx-auto px-4 lg:px-0 pt-10">
      {banners.length > 0 && (
        <div className="w-full">
          {banners.length === 1 ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${banners[0]}`}
              alt={`${category.name} banner`}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {banners.map((banner: string, idx: number) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_API_URL}${banner}`}
                  alt={`Banner ${idx + 1}`}
                  className="w-full h-60 object-cover rounded transition"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🧩 Subcategories Section */}
      {subcategories.length === 0 ? (
        <p className="text-gray-500 text-center">
          No subcategories found under this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 my-10">
          {subcategories.map((sub: any) => (
            <Card
              key={sub._id}
              className="hover:shadow-lg transition-shadow rounded-none py-0 pt-0"
            >
              <CardHeader className="flex items-center flex-col justify-center">
                <h3 className="text-lg font-bold text-center text-primary py-2">
                  {sub.name}
                </h3>
              </CardHeader>

              <CardContent className="mt-0 pt-0">
                <img
                  src={
                    sub.image && `${import.meta.env.VITE_API_URL}${sub.image}`
                  }
                  alt={sub.name}
                  className="w-full h-full object-cover"
                />
              </CardContent>

              <CardFooter className="border-t !p-2.5 flex items-center justify-center">
                <Link
                  to={`/product/${sub.slug}`}
                  className="capitalize font-bold"
                >
                  See More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoriesPage;
