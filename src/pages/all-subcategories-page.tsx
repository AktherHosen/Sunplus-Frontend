import Loader from "@/components/loader";
import { useGetCategoryBySlugQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";

const BASE_URL = import.meta.env.VITE_API_URL;

const AllSubcategoriesPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoryBySlugQuery(slug!);

  if (isLoading) return <Loader />;
  if (isError) return <div>Failed to load category data.</div>;

  const category = data?.data || {};
  const subcategories = category.subcategories || [];
  const banners = category.banners || [];

  return (
    <div className="">

      {banners.length > 0 && (
        <div className="w-full">
          {banners.length === 1 ? (
            <img
              src={`${BASE_URL}${banners[0]}`}
              alt={`${category.name} banner`}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {banners.map((banner: string, idx: number) => (
                <img
                  key={idx}
                  src={`${BASE_URL}${banner}`}
                  alt={`Banner ${idx + 1}`}
                  className="w-full h-60 object-cover rounded-lg shadow-md hover:shadow-lg transition"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🧩 Subcategories Section */}
      {subcategories.length === 0 ? (
        <p className="text-gray-500 text-center">
          No subcategories found under this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
          {subcategories.map((sub: any) => (
            <div
              key={sub._id}
              onClick={() => navigate(`/product/${sub.slug}`)}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white"
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
                <h2 className="text-lg font-semibold text-gray-800">
                  {sub.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoriesPage;
