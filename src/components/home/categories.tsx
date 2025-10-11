import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetAllCategoriesQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";
import Loader from "../loader";

export default function Categories() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery(undefined);
  const categories = data?.data || [];

  console.log()
  const BASE_URL = import.meta.env.VITE_API_URL;

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load categories.
      </div>
    );
  if (!categories.length)
    return <div className="text-center py-10">No categories found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
      {categories.map((category: any) => (
        <Card
          key={category._id}
          className="hover:shadow-lg transition-shadow rounded-none py-0 pt-4"
        >
          <CardHeader className="!p-2">
            <h3 className="text-lg font-bold text-center text-primary">
              {category.name}
            </h3>
          </CardHeader>

          <CardContent className="!p-0 !px-8">
            <img
              src={category.image && `${BASE_URL}${category.image}`}
              alt={category.name}
              className="w-full max-h-[300px] object-cover"
            />
          </CardContent>

          <CardFooter className="border-t !p-2.5 flex items-center justify-center">
            <Link
              to={`/category/${category?.slug}`}
              className="capitalize font-bold"
            >
              See More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
