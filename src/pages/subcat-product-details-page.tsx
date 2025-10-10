import Loader from "@/components/loader";
import { useGetProductsByCategoryAndSubcategoryQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const BASE_URL = "http://localhost:5000";

const SubcatProductDetailsPage = () => {
  const { categorySlug, subCategorySlug, productSlug } = useParams();

  const { data, isLoading, isError } =
    useGetProductsByCategoryAndSubcategoryQuery({
      categorySlug: categorySlug!,
      subSlug: subCategorySlug!,
      productSlug: productSlug!,
    });

  const product = data?.data;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="border rounded-lg shadow p-4 relative overflow-hidden">
        {/* Loader inside the card */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <Loader />
          </div>
        )}

        {!isLoading && (isError || !product) && (
          <div className="text-red-500 text-center py-20">
            Failed to load product details.
          </div>
        )}

        {!isLoading && product && (
          <>
            {/* Image with zoom effect */}
            <div className="overflow-hidden rounded">
              <img
                src={
                  product.image
                    ? `${BASE_URL}${product.image}`
                    : "https://via.placeholder.com/400x300"
                }
                alt={product.name}
                className="w-full h-64 object-cover rounded transform transition-transform duration-500 hover:scale-110"
              />
            </div>

            <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
            <p className="text-gray-700 font-medium mt-2">
              Price: ${product.price}
            </p>
            <p className="text-gray-500 mt-1">
              Category: {product.category_id?.name} <br />
              Subcategory: {product.subcategories?.name}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Created at: {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SubcatProductDetailsPage;
