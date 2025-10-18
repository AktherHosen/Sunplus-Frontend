import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetAllCategoriesQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";
import Loader from "../loader";
import placeholderImg from "@/assets/img/placeholder.png"
export default function Categories() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery(undefined);
  const categories = data?.data || [];

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-6 my-8">
      {categories.map((category: any) => (
        <Card
          key={category._id}
          className=" rounded-lg border-border hover:border-primary shadow-none py-0 pt-4"
        >
          <CardHeader className="!p-2">
            <h3 className="text-lg font-bold text-center text-primary">
              {category.name}
            </h3>
          </CardHeader>

          <CardContent className="!p-0 !px-8">
            <img
             src={
                    category.image
                      ? `${import.meta.env.VITE_API_URL}${category.image}`
                      : placeholderImg
                  }
              alt={category.name}
              className="w-full max-h-[300px] object-cover"
            />
          </CardContent>

          <CardFooter className="border-t !p-2.5  rounded-b-lg flex items-center justify-center">
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
