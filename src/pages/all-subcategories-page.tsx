import { useGetCategoryBySlugQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";

const AllSubcategoriesPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoryBySlugQuery(slug!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load subcategories.</div>;

  const subcategories = data?.data || [];

  return (
    <div>
      <h1>Subcategories for "{slug}"</h1>
      {subcategories.length === 0 ? (
        <p>No subcategories found.</p>
      ) : (
        <ul>
          {subcategories.map((sub) => (
            <li key={sub._id}>
              <strong
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => navigate(`/product/${sub.slug}`)}
              >
                {sub.name}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllSubcategoriesPage;
