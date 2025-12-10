import Loader from "@/components/loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SectionTitle from "@/components/ui/section-title";
import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { motion } from "framer-motion";
import { Check, Image, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const AllSubcategoryProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsBySubcategorySlugQuery(
    slug!
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products.
      </div>
    );
  console.log(data, "check");
  const products = data?.data?.products || [];
  const subcategory = data?.data?.subcategory ?? null;
  const banners = data?.data?.subcategory.banners || [];

  return (
    <div className="container mx-auto px-4 lg:px-0 py-10 space-y-10">
      {/* Banner Section */}
      {banners?.length > 0 && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {banners.length === 1 ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${banners[0]}`}
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
      <SectionTitle
        title={`Products in ${subcategory?.name || ""}`}
        subtitle="Browse all products available in this subcategory"
        align="center"
      />

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No products found in this subcategory.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-8">
          {products.map((product, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg shadow-none overflow-hidden"
            >
              <Card className="border gap-0 border-border hover:border-primary hover:rounded-lg transition-colors duration-300 rounded-lg p-0">
                <CardContent className="p-2">
                  <div className="w-full aspect-square overflow-hidden rounded-lg">
                    <div className="w-full aspect-square overflow-hidden rounded-lg relative">
                      {product.image ? (
                        <motion.img
                          src={`${import.meta.env.VITE_API_URL}${
                            product.image
                          }`}
                          alt={product.name}
                          className={`w-full h-full object-cover transition-transform duration-300 
                            ${
                              product?.meta?.new_arrival
                                ? "blur-xs opacity-80"
                                : "hover:scale-105"
                            }
                          `}
                          loading="lazy"
                          whileHover={{
                            scale: product?.meta?.new_arrival ? 1 : 1.01,
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-100">
                          <Image className="w-12 h-12 text-gray-400" />
                        </div>
                      )}

                      {/* Coming Soon overlay */}
                      {product?.meta?.new_arrival && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="px-4 py-2 text-xs sm:text-sm font-semibold bg-primary text-white rounded-lg backdrop-blur">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>

                {/* Card footer */}
                <CardFooter className="flex flex-col w-full rounded-b-lg bg-accent px-4 py-2 ">
                  <div className="flex flex-col items-start gap-1 w-full">
                    <p className="text-base font-semibold text-foreground line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      Tk. {product.price.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`flex items-center justify-between w-full mt-1.5 text-sm font-medium ${
                      Number(product.quantity) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {Number(product.quantity) > 0 ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          <span>Out of Stock</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 border-t border-border/40 pt-3 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/product/${product.category_id?.slug}/${product.subcategories?.slug}/${product.slug}`
                        );
                      }}
                      className="
                      inline-flex items-center justify-center w-full 
                      text-sm font-medium px-4 py-2 rounded-lg
                      bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground
                      transition-colors duration-300
                    "
                    >
                      View Details
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoryProductPage;
