import Loader from "@/components/loader";
import SectionTitle from "@/components/ui/section-title";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { Check, X, Image as ImageIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";

const AllSubcategoryProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsBySubcategorySlugQuery(slug!);

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-center py-10 text-red-500">Failed to load products.</div>;

  const products = data?.data?.products || [];
  const subcategory = data?.data?.subcategory;
  const banner = data?.data?.subcategory?.banners?.[0];

  return (
    <div className="container mx-auto px-4 lg:px-0 py-10 space-y-10">
      {/* Banner Section */}
      {banner && (
        <div className="w-full rounded-lg overflow-hidden mb-6">
          <motion.img
            src={`${import.meta.env.VITE_API_URL}${banner}`}
            alt={subcategory?.name || "Banner"}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
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
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="shadow-none rounded-lg border-border hover:border-primary cursor-pointer transition"
                onClick={() =>
                  navigate(
                    `/product/${product.category_id?.slug}/${product.subcategory?.slug}/${product.slug}`
                  )
                }
              >
                <CardHeader className="relative overflow-hidden flex-shrink-0 rounded-t-lg">
                  {product.image ? (
                    <motion.img
                      src={`${import.meta.env.VITE_API_URL}${product.image}`}
                      alt={product.name}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                    />
                  ) : (
                    <div className="w-full h-40 sm:h-48 md:h-56 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                </CardHeader>

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
