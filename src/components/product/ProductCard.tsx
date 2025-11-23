import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { Check, Image, Package, X } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";

const ProductCard = ({ slug }) => {
  const { data, isLoading, isError, error } =
    useGetProductsBySubcategorySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            Error loading products: {error?.message || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  const products = data?.data?.products || [];
  const subcategoryName =
    data?.data?.data?.subcategory?.name || "this category";

  if (products.length === 0) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No similar products found</p>
          </div>
        </div>
      </div>
    );
  }
  const topProducts = products.slice(0, 4);

  return (
    <div className="w-full ">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Similar Products
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {topProducts.map((product) => (
          <Link
            to={`/product/${product.category_id?.slug}/${product.subcategories?.slug}/${product.slug}`}
            key={product._id}
            className="bg-background border rounded-lg  overflow-hidden  transition-shadow duration-300 flex hover:border-primary"
          >
            {/* Product Image */}
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-md">
              {product.image ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="py-2 px-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {product.name}
                </h3>

                <div
                  className={`flex items-center gap-1.5 text-sm font-medium whitespace-nowrap ${
                    Number(product.quantity) > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {Number(product.quantity) > 0 ? (
                    <Badge>
                      <Check className="w-4 h-4" />
                      <span>In Stock</span>
                    </Badge>
                  ) : (
                    <Badge variant={"destructive"}>
                      <X className="w-4 h-4" />
                      <span>Out of Stock</span>
                    </Badge>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between border-t border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    <span className="text-lg">৳</span>
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">each</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
