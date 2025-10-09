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

  if (isLoading) return <div>Loading product details...</div>;
  if (isError || !data?.data) return <div>Failed to load product details.</div>;

  const product = data.data;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="border rounded-lg shadow p-4">
        <img
          src={
            product.image
              ? `${BASE_URL}${product.image}`
              : "https://via.placeholder.com/400x300"
          }
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
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
      </div>
    </div>
  );
};

export default SubcatProductDetailsPage;
