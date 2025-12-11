import Loader from "@/components/loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SectionTitle from "@/components/ui/section-title";
import { useGetCategoryBySlugQuery } from "@/redux/api/baseApi";
import { motion } from "framer-motion";
import { Image } from "lucide-react";
import { Link, useParams } from "react-router";

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
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          {banners.length === 1 ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${banners[0]}`}
              alt={`${category.name} banner`}
              className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {banners.map((banner: string, idx: number) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_API_URL}${banner}`}
                  alt={`Banner ${idx + 1}`}
                  className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <SectionTitle
          title={`Subcategories of ${category.name}`}
          subtitle="Explore products under each subcategory"
          align="center"
        />
      </motion.div>

      {/* Subcategories Grid */}
      {subcategories.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No subcategories found under this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-8">
          {subcategories.map((sub: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg shadow-none border-border hover:border-primary transition-colors duration-300 overflow-hidden">
              <Card className="py-0">
                <CardHeader className="!p-2">
                  <h3 className="text-lg font-bold text-center text-primary truncate">
                    {sub.name}
                  </h3>
                </CardHeader>

                <CardContent className="!p-0 !px-4">
                  <div className="w-full aspect-square overflow-hidden rounded-lg relative mb-3">
                    {sub.image ? (
                      <motion.img
                        src={`${import.meta.env.VITE_API_URL}${sub.image}`}
                        alt={sub.name}
                        className={`w-full h-full object-cover transition-transform duration-300
                            ${sub?.new_arrival ? "blur-xs opacity-80" : "hover:scale-105"}
                          `}
                        loading="lazy"
                        whileHover={{
                          scale: sub?.new_arrival ? 1 : 1.01,
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-100">
                        <Image className="w-12 h-12 text-gray-400" />
                      </div>
                    )}

                    {/* Coming Soon overlay */}
                    {sub?.new_arrival && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-primary text-white rounded-lg backdrop-blur">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="border-t !p-2.5 flex items-center justify-center bg-muted/30">
                  <Link
                    to={`/product/${sub?.slug}`}
                    className="uppercase text-base font-semibold text-primary hover:underline">
                    See More
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoriesPage;
