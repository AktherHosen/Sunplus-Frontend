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
        opts={{ align: "start", loop: true }}
      >
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
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/product/${category}/${subcategory}/${slug}`}>
                    <Card className="pb-0 group relative h-full overflow-hidden rounded-lg border border-border bg-gradient-to-b from-background to-muted/30  hover:border-primary/40 transition-all duration-300 cursor-pointer">
                      {/* Stock Badge */}
                      {product.quantity !== undefined && (
                        <div
                          className={`absolute top-3 right-3 z-10 px-2.5 py-1 text-[11px] font-semibold rounded-xl tracking-wide  ${
                            Number(product.quantity) > 0
                              ? "bg-emerald-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }`}
                        >
                          {Number(product.quantity) > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </div>
                      )}

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

                          {/* Overlay effect on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col items-center justify-between flex-grow mt-3 text-center">
                          <h3 className="text-sm font-semibold text-foreground/90 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>

                          {product.price && (
                            <p className="mt-2 text-base font-bold text-primary tracking-wide">
                              ৳{Number(product.price).toFixed(2)}
                            </p>
                          )}
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
