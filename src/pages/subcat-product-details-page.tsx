import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Placeholder from "@/assets/img/placeholder.png";
import Loader from "@/components/loader";
import { useGetProductsByCategoryAndSubcategoryQuery } from "@/redux/api/baseApi";
import OrderForm from "@/components/orders/order-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { motion } from "framer-motion"; // <-- added
import { cn } from "@/lib/utils";

const SubcatProductDetailsPage = () => {
  const { categorySlug, subCategorySlug, productSlug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError } =
    useGetProductsByCategoryAndSubcategoryQuery({
      categorySlug: categorySlug!,
      subSlug: subCategorySlug!,
      productSlug: productSlug!,
    });

  const product = data?.data;

  if (isLoading) return <Loader />;
  if (isError || !product) return <div>Product not found</div>;

  const galleryImages = product.image
    ? [product.image]
    : [];

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* --- Product Section --- */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        {/* Left: Main Image */}
        <Card className="overflow-hidden shadow-none h-fit">
          <Zoom>
            <motion.img
              src={
                galleryImages[selectedImage]
                  ? `${import.meta.env.VITE_API_URL}${
                      galleryImages[selectedImage]
                    }`
                  : Placeholder
              }
              alt={product.name}
              className="w-full h-[300px] object-contain p-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Zoom>

          {galleryImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-2">
              {galleryImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition ${
                    selectedImage === idx
                      ? "border-blue-600 ring-1 ring-blue-300"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${img}`}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </Card>

        {/* Right: Info + Actions */}
        <motion.div
          className="space-y-4 p-6 rounded-xl border bg-background/40 backdrop-blur-sm "
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          {/* Product Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Price Section */}
          <div className="flex items-end gap-3">
            <span className="text-2xl font-bold text-primary">
              ৳{Number(product.price).toFixed(2)}
            </span>
          </div>

          {/* Short Description */}
          {/* <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {product.description ||
              "Premium product built with precision and quality you can trust."}
          </p> */}

          {/* Stock + Category Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Stock
              </dt>
              <dd
                className={cn(
                  "font-semibold mt-1 flex items-center gap-1",
                  Number(product.quantity) > 0
                    ? "text-green-600"
                    : "text-red-600"
                )}>
                <span className="text-lg">●</span>
                {Number(product.quantity) > 0 ? "In Stock" : "Out of Stock"}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Category
              </dt>
              <dd className="font-semibold mt-1 text-foreground">
                {product.category_id?.name || "N/A"}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Subcategory
              </dt>
              <dd className="font-semibold mt-1 text-foreground">
                {product.subcategory?.name || "N/A"}
              </dd>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-row gap-3 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}>
            {/* Order Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  disabled={Number(product.quantity) <= 0}
                  className="flex-1 text-base font-medium gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <OrderForm
                  productId={product._id}
                  productName={product.name}
                  maxQuantity={Number(product.quantity)}
                  onSuccess={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Buy Now / Contact */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 text-base font-medium gap-2">
                  Contact Distributor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Distributor</DialogTitle>
                  <DialogDescription>
                    Call: <strong>01686691262</strong> or Toll-Free:{" "}
                    <strong>08000016267</strong>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <Card className="p-4 shadow-none">
          <Tabs defaultValue="features" className="w-full mt-2">
            <TabsList className="px-1 flex space-x-1">
              {["features", "specs", "gallery", "support"].map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            <div className="px-2 pt-4 bg-background rounded-b-xl space-y-6">
              {/* Features */}
              <TabsContent value="features">
                {product.meta?.features ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {product.meta.features
                      .split(" - ")
                      .filter(Boolean)
                      .map((feature: string, idx: number) => (
                        <li key={idx}>{feature}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No feature details available.
                  </p>
                )}
              </TabsContent>

              {/* Specifications */}
              <TabsContent value="specs">
                {product.meta?.specifications ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {product.meta.specifications
                      .split(" - ")
                      .filter(Boolean)
                      .map((feature: string, idx: number) => (
                        <li key={idx}>{feature}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No technical specifications available.
                  </p>
                )}
              </TabsContent>

              {/* Gallery */}
              <TabsContent value="gallery">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}>
                      <Zoom>
                        <Avatar className="w-32 h-32 rounded-lg overflow-hidden">
                          <AvatarImage
                            src={`${import.meta.env.VITE_API_URL}${img}`}
                            alt={`View ${idx + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </Avatar>
                      </Zoom>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Support */}
              <TabsContent value="support">
                {product.meta?.supports ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {product.meta.supports
                      .split(" - ")
                      .filter(Boolean)
                      .map((feature: string, idx: number) => (
                        <li key={idx}>{feature}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    For support, contact customer service.
                  </p>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubcatProductDetailsPage;
