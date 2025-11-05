import { Badge } from "@/components/ui/badge";
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
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const { data, isLoading } = useGetAllProductsQuery();
  const products: IProduct[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading latest products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No products found.
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
        title="New Arrivals Products"
        subtitle="Discover our newest arrivals and best-selling items."
        align="center"
      />

      <Carousel
        plugins={[autoplay.current]}
        className="w-full"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="gap-4">
          {chunkArray(products, 6).map((chunk, chunkIndex) => (
            <CarouselItem
              key={chunkIndex}
              className="w-full grid gap-4 
                         grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 items-start"
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
                      <Card className="rounded-lg p-2 shadow-none border border-border hover:border-primary transition-colors duration-300 overflow-hidden h-full">
                        <CardContent className="flex flex-row items-center gap-4  h-full p-0">
                          <Avatar className="w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 flex-shrink-0 rounded-lg overflow-hidden bg-muted/40">
                            {product.image ? (
                              <AvatarImage
                                src={`${import.meta.env.VITE_API_URL}${
                                  product.image
                                }`}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <AvatarFallback>
                                <Image className="w-12 h-12 rounded-lg text-muted-foreground/60" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          {/* Product Info */}
                          <div className="flex flex-col justify-between flex-grow w-full">
                            <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                              {product.name}
                            </h3>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-2 sm:gap-4">
                              {product.price && (
                                <p className="text-base md:text-lg font-bold text-primary tracking-wide">
                                  ৳{Number(product.price).toFixed(2)}
                                </p>
                              )}
                              {product.quantity !== undefined && (
                                <Badge
                                  variant={
                                    Number(product.quantity) > 0
                                      ? "default"
                                      : "destructive"
                                  }
                                  className="text-sm font-medium"
                                >
                                  {Number(product.quantity) > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                                </Badge>
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
