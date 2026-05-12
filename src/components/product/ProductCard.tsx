import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { Check, Image, Package, X } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

interface ProductCardProps {
  slug: string;
}

const ProductCard = ({ slug }: ProductCardProps) => {
  const { data, isLoading, isError, error } =
    useGetProductsBySubcategorySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="mb-4">
          <Skeleton className="h-7 w-40" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-background border rounded-lg overflow-hidden flex"
            >
              <Skeleton className="w-24 h-24 flex-shrink-0 rounded-md" />
              <div className="py-2 px-4 flex-1 flex flex-col justify-between">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {"message" in (error as any)
              ? (error as any).message
              : "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  const products = data?.data?.products || [];

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
            className="bg-background border rounded-lg overflow-hidden transition-shadow duration-300 flex hover:border-primary"
          >
            {/* Product Image with blurry overlay */}
            <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden rounded-md">
              {product.image ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-300"
                  loading="lazy"
                />
              ) : (
                <Image className="w-24 h-24 text-muted-foreground" />
              )}

              {/* Blurry overlay */}
              {product.meta?.new_arrival === "true" && (
                <div className="absolute inset-0  backdrop-blur-xs flex items-center justify-center">
                  <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="py-2 px-4 flex-1 flex flex-col justify-between">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 pr-4">
                {product.name}
              </h3>

              <div className="flex items-center justify-between border-t border-gray-100">
                {/* <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-primary">
                    <span className="text-lg">৳</span>
                    {product.variants && product.variants.length > 0 ? (
                      <>
                        {Math.min(
                          ...product.variants.map((v: IVariant) => v.price)
                        ).toFixed(2)}
                        {" - "}
                        {Math.max(
                          ...product.variants.map((v: IVariant) => v.price)
                        ).toFixed(2)}
                      </>
                    ) : product.price ? (
                      product.price.toFixed(2)
                    ) : (
                      "N/A"
                    )}
                  </span>
                  <span className="text-sm text-gray-500">each</span>
                </div> */}

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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
