import Loader from "@/components/loader";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { Check, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import placeholderImg from "@/assets/img/placeholder.png";
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
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this subcategory.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="shadow-none rounded-lg border-border hover:border-primary pt-0 cursor-pointer"
              onClick={() =>
                navigate(
                  `/product/${product.category_id?.slug}/${product.subcategory?.slug}/${product.slug}`
                )
              }>
              <CardHeader className="relative overflow-hidden flex-shrink-0">
                <img
                  src={
                    product.image
                      ? `${import.meta.env.VITE_API_URL}${product.image}`
                      : placeholderImg
                  }
                  alt={product.name}
                  className="w-full max-h-64 object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
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
                      Number(product.quantity) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
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
