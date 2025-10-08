import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProductsByCategoryAndSubcategoryQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";

export default function SubcategoryProductPage() {
  const { categorySlug, subSlug } = useParams();
  const BASE_URL = "http://localhost:5000";
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetProductsByCategoryAndSubcategoryQuery({
      categorySlug: categorySlug!,
      subSlug: subSlug!,
    });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;
  if (!data || data.length === 0) return <p>No products found.</p>;

  console.log(data, "check");
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">{subSlug}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data?.map((product) => (
          <Card
            key={product._id}
            className="hover:shadow-lg"
            onClick={() =>
              navigate(`/${categorySlug}/${subSlug}/${product.slug}`)
            }
          >
            <CardHeader className="p-0">
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
              <CardTitle className="text-lg text-center">
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
