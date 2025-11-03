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
import SectionTitle from "../ui/section-title";
import { Badge } from "@/components/ui/badge";

export default function LatestProducts() {
  const autoplay = useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: true })
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

  return (
    <section className="w-full py-8">
      <SectionTitle
        title="New Arrivals Products"
        subtitle="Discover our newest arrivals and best-selling items."
        align="center"
      />

      <Carousel
        plugins={[autoplay.current]}
        className="w-full"
        opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {products.map((product: IProduct, index) => {
            const category = product.category_id?.slug ?? "unknown";
            const subcategory = product.subcategory?.slug ?? "general";
            const slug =
              product.slug ||
              product.name?.toLowerCase().replace(/\s+/g, "-") ||
              "product";

            return (
              <CarouselItem
                key={product._id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Link to={`/product/${category}/${subcategory}/${slug}`}>
                    <Card className="relative py-0 rounded-lg shadow-none border border-border hover:border-primary transition-colors duration-300 overflow-hidden">
                      <CardContent className="flex flex-col items-center justify-between h-full p-4">
                        {/* Image */}
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted/40">
                          {product.image ? (
                            <motion.img
                              src={`${import.meta.env.VITE_API_URL}${
                                product.image
                              }`}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full">
                              <Image className="w-12 h-12 text-muted-foreground/60" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                        </div>

                        <div className="flex flex-col justify-between flex-grow mt-3 group">
                          {/* Product Name */}
                          <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 text-left">
                            {product.name}
                          </h3>

                          {/* Price & Stock */}
                          <div className="flex items-center justify-start mt-2 gap-4">
                            {product.price && (
                              <p className="text-base md:text-lg font-bold text-primary tracking-wide">
                                ৳{Number(product.price).toFixed(2)}
                              </p>
                            )}

                            {product.quantity !== undefined && (
                              <Badge
                                variant={Number(product.quantity) > 0 ? "default" : "destructive"}
                                className="text-sm font-medium"
                              >
                                {Number(product.quantity) > 0 ? "In Stock" : "Out of Stock"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel> 
    </section>
  );
}
