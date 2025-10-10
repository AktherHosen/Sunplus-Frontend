import Loader from "@/components/loader";
import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";

const BASE_URL = "http://localhost:5001"; // Backend URL

const AllSubcategoryProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsBySubcategorySlugQuery(
    slug!
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Failed to load products.</div>;

  const products = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Products for Subcategory "{slug}"
      </h1>

      {products.length === 0 ? (
        <p>No products found in this subcategory.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              onClick={() =>
                navigate(
                  `/product/${product.category_id?.slug}/${product.subcategories?.slug}/${product.slug}`
                )
              }
            >
              <img
                src={
                  product.image
                    ? `${BASE_URL}${product.image}`
                    : "https://via.placeholder.com/300x200"
                }
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 font-medium">${product.price}</p>
                <p className="text-sm text-gray-500">
                  Category: {product.category_id?.name || "Unknown"} <br />
                  Subcategory: {product.subcategories?.name || "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoryProductPage;
