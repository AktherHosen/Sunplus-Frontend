import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import type { IProduct } from "@/types/product";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Image } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SectionTitle from "../ui/section-title";

export default function LatestProducts() {
  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const { data, isLoading } = useGetAllProductsQuery();
  const products: IProduct[] = data?.data || [];

  const newArrivalProducts = products.filter(
    (product) => product.meta?.new_arrival === "true",
  );

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading latest products...
      </div>
    );
  }

  if (!newArrivalProducts.length) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Something new is on the way.
      </div>
    );
  }

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const results: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  }

  return (
    <section className="w-full py-8" id="latestProducts">
      <SectionTitle
        title="New Arrivals"
        subtitle="Discover our newest arrivals items."
        align="center"
      />

      <Carousel
        plugins={[autoplay.current]}
        className="w-full"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="gap-4">
          {chunkArray(newArrivalProducts, 8).map((chunk, chunkIndex) => (
            <CarouselItem
              key={chunkIndex}
              className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 items-start"
            >
              {chunk.map((product, index) => {
                const category = product.category_id?.slug ?? "unknown";
                const subcategory = product.subcategories?.slug ?? "general";
                const slug =
                  product.slug ||
                  product.name?.toLowerCase().replace(/\s+/g, "-") ||
                  "product";

                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link to={`/product/${category}/${subcategory}/${slug}`}>
                      <Card className="rounded-lg p-2 shadow-none border border-border hover:border-primary transition-colors duration-300 overflow-hidden h-full relative">
                        <CardContent className="flex flex-row items-center gap-4 h-full p-0 relative">
                          <Avatar className="w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 flex-shrink-0 rounded-lg overflow-hidden bg-muted/40 relative">
                            {product.image ? (
                              <div className="relative w-full h-full">
                                {/* Blurred image */}
                                <AvatarImage
                                  src={`${import.meta.env.VITE_API_URL}${product.image}`}
                                  alt={product.name}
                                  className={`w-full h-full object-cover transition duration-300 ${
                                    product.meta?.new_arrival === "true"
                                      ? "blur-xs opacity-70"
                                      : ""
                                  }`}
                                />

                                {/* Centered "Coming Soon" badge */}
                                {product.meta?.new_arrival === "true" && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="p-1 text-xs font-semibold text-white bg-black/50 rounded">
                                      Coming Soon
                                    </span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <AvatarFallback>
                                <Image className="w-12 h-12 rounded-lg text-muted-foreground/60" />
                              </AvatarFallback>
                            )}
                          </Avatar>

                          <div className="flex flex-col justify-between flex-grow w-full">
                            <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                              {product.name}
                            </h3>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-2 sm:gap-4">
                              {/* {product.price && (
                                <p className="text-base md:text-lg font-bold text-primary tracking-wide">
                                  ৳{Number(product.price).toFixed(2)}
                                </p>
                              )} */}
                              {product.quantity !== undefined && (
                                <span
                                  className={`text-sm font-medium px-2 py-1 rounded ${
                                    Number(product.quantity) > 0
                                      ? "bg-gray-200 text-gray-800"
                                      : "bg-red-500 text-white"
                                  }`}
                                >
                                  {Number(product.quantity) > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
