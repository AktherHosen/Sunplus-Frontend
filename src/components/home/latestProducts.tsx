import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { IProduct } from "@/types/product";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import SectionTitle from "../ui/section-title";
import { motion } from "framer-motion";

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
        <CarouselContent className="">
          {products.map((product: IProduct, index) => (
            <CarouselItem
              key={product._id || product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full shadow-none transition">
                  <CardContent className="flex flex-col h-full items-center justify-between p-4">
                    <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
                      <motion.img
                        src={
                          product.image
                            ? `${import.meta.env.VITE_API_URL}${product.image}`
                            : "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    <div className="flex flex-col items-center flex-grow">
                      <h3 className="text-sm font-medium text-center line-clamp-2">
                        {product.name}
                      </h3>
                      {product.price && (
                        <p className="text-sm text-muted-foreground font-bold mt-1">
                          ৳{Number(product.price).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
