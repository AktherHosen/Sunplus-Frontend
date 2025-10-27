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
import { Image } from "lucide-react";
import { Link } from "react-router";

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

  console.log(products, "latest products");
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
            const category =
              product.category_id?.slug;
            const subcategory =
              product.subcategories?.slug;
            const slug = product.slug || product.name?.toLowerCase().replace(/\s+/g, "-");

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
                  {/* 👇 Use category/subcategory/slug in the link */}
                  <Link to={`/product/${category}/${subcategory}/${slug}`}>
                    <Card className="h-full shadow-none transition relative hover:shadow-md hover:scale-[1.02] duration-200 cursor-pointer">
                      {/* Stock Badge */}
                      {product.quantity !== undefined && (
                        <div
                          className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
                            Number(product.quantity) > 0
                              ? "bg-chart-2 text-muted"
                              : "bg-destructive text-muted"
                          }`}
                        >
                          {Number(product.quantity) > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </div>
                      )}

                      <CardContent className="flex flex-col h-full items-center justify-between p-4">
                        <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
                          {product.image ? (
                            <motion.img
                              src={`${import.meta.env.VITE_API_URL}${product.image}`}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              loading="lazy"
                              whileHover={{ scale: 1.05 }}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-100">
                              <Image className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
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
