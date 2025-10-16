import Loader from "@/components/loader";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { Check, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const AllSubcategoryProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsBySubcategorySlugQuery(
    slug!
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Failed to load products.</div>;

  const products = data?.data?.products || [];
  const subcategory = products[0]?.subcategory;
  const banner = data?.data?.subcategory.banners[0];
  return (
    <div className="container mx-auto px-4 lg:px-0 py-10">
      {/* Show subcategory banner */}

      <div className="mb-8">
        <img
          src={`${import.meta.env.VITE_API_URL}${banner}`}
          alt={subcategory?.name || "Banner"}
          className="w-full h-full object-cover rounded shadow-md"
        />
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this subcategory.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="cursor-pointer rounded-none pt-0"
              onClick={() =>
                navigate(
                  `/product/${product.category_id?.slug}/${product.subcategory?.slug}/${product.slug}`
                )
              }
            >
              <CardHeader className="p-0 relative overflow-hidden pt-0 flex-shrink-0">
                <img
                  src={
                    product.image
                      ? `${import.meta.env.VITE_API_URL}${product.image}`
                      : "https://via.placeholder.com/300x400"
                  }
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </CardHeader>

              <CardFooter>
                <div>
                  <p className="text-lg font-bold text-primary">
                    {product.name}
                  </p>
                  <p className="text-primary font-bold mt-1">
                    Tk. {product.price}
                  </p>
                  <div
                    className={`flex items-center gap-1 py-2 text-sm ${
                      Number(product.quantity.length) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {Number(product.quantity.length) > 0 ? (
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
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoryProductPage;
