import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCategoryBySlugQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";

export default function Subcategories() {
  const { slug } = useParams(); // parent category slug (e.g. "gang-switches")
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCategoryBySlugQuery(slug!);

  const category = data?.data;
  const subcategories = category?.subcategories || [];

  if (isLoading) return <p className="p-4">Loading subcategories...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Failed to load subcategories.</p>;
  if (!subcategories.length)
    return <p className="p-4 text-gray-500">No subcategories found.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">
        {category.name} - Subcategories
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subcategories.map((sub: any) => (
          <Card
            key={sub._id}
            className="overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/category/${slug}/${sub.slug}`)} // ✅ FIXED
          >
            <CardHeader className="p-0 relative">
              <img
                src={
                  sub.image
                    ? `${import.meta.env.VITE_API_URL}${sub.image}`
                    : "https://via.placeholder.com/300x200"
                }
                alt={sub.name}
                className="w-full h-60 object-cover"
              />
            </CardHeader>
            <CardContent className="p-3">
              <CardTitle className="text-center text-lg">{sub.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
