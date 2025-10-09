import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const AllSubcategoryProductPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetProductsBySubcategorySlugQuery(
    slug!
  );

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Failed to load products.</div>;

  // API wraps products inside `data`
  const products = data?.data || [];

  return (
    <div>
      <h1>Products for Subcategory "{slug}"</h1>
      {products.length === 0 ? (
        <p>No products found in this subcategory.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} style={{ marginBottom: "1rem" }}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>
                Category: {product.category_id?.name || "Unknown"} <br />
                Subcategory: {product.subcategories?.name || "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllSubcategoryProductPage;
