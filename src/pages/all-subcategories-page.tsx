import Loader from "@/components/loader";
import { useGetCategoryBySlugQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";

const BASE_URL = "http://localhost:5000";

const AllSubcategoriesPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoryBySlugQuery(slug!);

  if (isLoading) return <Loader />;
  if (isError) return <div>Failed to load subcategories.</div>;

  const subcategories = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subcategories for "{slug}"</h1>

      {subcategories.length === 0 ? (
        <p>No subcategories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/product/${sub.slug}`)}
            >
              <img
                src={
                  sub.image
                    ? `${BASE_URL}${sub.image}`
                    : "https://via.placeholder.com/300x200"
                }
                alt={sub.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{sub.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoriesPage;
