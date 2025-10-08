import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

export default function SubCategoryProductPage() {
  const { slug } = useParams(); // slug of the subcategory
  const BASE_URL = "http://localhost:5000";

  const { data, isLoading, isError } = useGetProductsBySubcategorySlugQuery(
    slug!
  );

  const products = data?.data || [];

  if (isLoading) return <p className="p-4">Loading products...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Failed to load products.</p>;
  if (!products.length)
    return <p className="p-4 text-gray-500">No products found.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <Card
            key={product._id}
            className="overflow-hidden hover:shadow-lg transition"
          >
            <CardHeader className="p-0 relative">
              <img
                src={
                  product.image
                    ? `${BASE_URL}${product.image}`
                    : "https://via.placeholder.com/300x200"
                }
                alt={product.name}
                className="w-full h-60 object-cover"
              />
            </CardHeader>
            <CardContent className="p-3">
              <CardTitle className="text-center text-lg">
                {product.name}
              </CardTitle>
              <p className="text-center font-semibold">${product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
