import Loader from "@/components/loader";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useGetProductsBySubcategorySlugQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";

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
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Products for Subcategory "{slug}"
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this subcategory.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="cursor-pointer "
              onClick={() =>
                navigate(
                  `/product/${product.category_id?.slug}/${product.subcategories?.slug}/${product.slug}`
                )
              }
            >
              {/* Image */}
              <CardHeader className="p-0 relative overflow-hidden rounded-t-xl flex-shrink-0">
                <img
                  src={
                    product.image
                      ? `${import.meta.env.VITE_API_URL}${product.image}`
                      : "https://via.placeholder.com/300x400"
                  }
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Available Badge */}
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">
                  Available
                </span>

                {/* Optional hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-t-xl" />
              </CardHeader>

              {/* Content */}
              {/* Footer */}
              <CardFooter>
                <div>
                  <p className="text-lg font-bold text-primary">
                    {product.name}
                  </p>
                  <p className="text-primary  font-bold mt-1">
                    Tk. {product.price}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubcategoryProductPage;
