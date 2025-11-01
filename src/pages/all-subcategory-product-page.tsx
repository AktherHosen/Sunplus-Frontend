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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {products.map((product, index: number) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="shadow-none py-0 rounded-lg border-border hover:border-primary cursor-pointer transition"
                onClick={() =>
                  navigate(
                    `/product/${product.category_id?.slug}/${product.subcategory?.slug}/${product.slug}`
                  )
                }
              >
                <CardContent className="p-2 sm:p-4 flex justify-center">
                  {product.image ? (
                    <motion.img
                      src={`${import.meta.env.VITE_API_URL}${product.image}`}
                      alt={product.name}
                      className="w-full max-h-48 sm:max-h-64 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                    />
                  ) : (
                    <div className="w-full max-h-48 sm:max-h-64 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-300">
                      <Image className="w-12 h-12" />
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col gap-2 p-3">
                  <p className="text-sm sm:text-base font-semibold text-primary truncate">
                    {product.name}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-primary">
                    Tk. {product.price}
                  </p>

                  <div
                    className={`flex items-center gap-1 py-1 text-sm ${
                      Number(product.quantity) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {Number(product.quantity) > 0 ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="font-semibold">In Stock</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        <span className="font-semibold">Out of Stock</span>
                      </>
                    )}
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
