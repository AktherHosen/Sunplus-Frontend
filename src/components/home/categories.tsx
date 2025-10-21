import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetAllCategoriesQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";
import Loader from "../loader";
import placeholderImg from "@/assets/img/placeholder.png";
import SectionTitle from "@/components/ui/section-title";
import { motion } from "framer-motion";

export default function Categories() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery(undefined);
  const categories = data?.data || [];

  if (isLoading) return <Loader fullscreen={true} message="Fetching categories..." />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load categories.
      </div>
    );
  if (!categories.length)
    return <div className="text-center py-10">No categories found.</div>;

  return (
    <section className="">
      <SectionTitle
        title="Shop by Categories"
        subtitle="Explore products from our wide range of categories."
        align="center"
      />

     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
      {categories.map((category: any, index: number) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          className="rounded-lg shadow-none border-border hover:border-primary transition-colors duration-300 overflow-hidden"
        >
          <Card className="py-0">
            <CardHeader className="!p-2">
              <h3 className="text-lg font-bold text-center text-primary truncate">
                {category.name}
              </h3>
            </CardHeader>

            <CardContent className="!p-0 !px-8">
              <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
                <img
                  src={
                    category.image
                      ? `${import.meta.env.VITE_API_URL}${category.image}`
                      : placeholderImg
                  }
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </CardContent>

            <CardFooter className="border-t !p-2.5 flex items-center justify-center bg-muted/30">
              <Link
                to={`/category/${category?.slug}`}
                className="capitalize font-semibold text-primary hover:underline"
              >
                See More
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>

    </section>
  );
}
