import Loader from "@/components/loader";
import SectionTitle from "@/components/ui/section-title";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetCategoryBySlugQuery } from "@/redux/api/baseApi";
import { Link, useParams } from "react-router";
import placeholderImg from "@/assets/img/placeholder.png";
import { Image } from "lucide-react";

const AllSubcategoriesPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetCategoryBySlugQuery(slug!);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load category data.
      </div>
    );

  const category = data?.data || {};
  const subcategories = category.subcategories || [];
  const banners = category.banners || [];

  return (
    <div className="container mx-auto px-4 lg:px-0 pt-8 space-y-12">
      {/* Banner Section */}
      {banners.length > 0 && (
        <div className="w-full">
          {banners.length === 1 ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${banners[0]}`}
              alt={`${category.name} banner`}
              className="w-full h-auto object-cover rounded-lg"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {banners.map((banner: string, idx: number) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_API_URL}${banner}`}
                  alt={`Banner ${idx + 1}`}
                  className="w-full h-auto object-cover rounded-lg transition"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section Title */}
      <SectionTitle
        title={`Subcategories of ${category.name}`}
        subtitle="Explore products under each subcategory"
        align="center"
      />

      {/* Subcategories Grid */}
      {subcategories.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No subcategories found under this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 my-6">
          {subcategories.map((sub: any) => (
            <Card
              key={sub._id}
              className="rounded-lg shadow-none hover:border-primary transition-colors duration-300 py-0">
              <CardHeader className="flex flex-col items-center justify-center py-2">
                <h3 className="text-base sm:text-lg font-semibold text-center text-primary line-clamp-2">
                  {sub.name}
                </h3>
              </CardHeader>

              <CardContent className="p-2 sm:p-4 flex justify-center">
                {sub.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}${sub.image}`}
                    alt={sub.name}
                    className="w-full max-h-48 sm:max-h-64 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full max-h-48 sm:max-h-64 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-300">
                    <Image className="w-12 h-12" />
                  </div>
                )}
              </CardContent>

              <CardFooter className="border-t !p-2 rounded-b-lg flex items-center justify-center">
                <Link
                  to={`/product/${sub.slug}`}
                  className="capitalize font-semibold text-sm sm:text-base hover:underline text-primary">
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
