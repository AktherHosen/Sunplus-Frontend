import { Image, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useParams } from "react-router";

import Loader from "@/components/loader";
import OrderForm from "@/components/orders/order-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProductsByCategoryAndSubcategoryQuery } from "@/redux/api/baseApi";

import ProductCard from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

  const product = data?.data ?? null;

  const isComingSoon = useMemo(() => {
    const v = product?.meta?.new_arrival;
    return v === true || v === "true";
  }, [product?.meta?.new_arrival]);

  const parseCSV = (value?: string) =>
    value
      ? value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const watts = parseCSV(product?.meta?.watt);
  const additionalWatts = parseCSV(product?.meta?.additional_watt);
  const colors = parseCSV(product?.meta?.color);
  const additionalColors = parseCSV(product?.meta?.additional_color);
  const sizes = parseCSV(product?.meta?.size);

  // States
  const [selectedWatt, setSelectedWatt] = useState<string | null>(null);
  const [selectedAdditionalWatt, setSelectedAdditionalWatt] = useState<
    string | null
  >(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedAdditionalColor, setSelectedAdditionalColor] = useState<
    string | null
  >(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedWatt) {
      if (watts.length > 0) setSelectedWatt(watts[0]);
      else if (additionalWatts.length > 0)
        setSelectedAdditionalWatt(additionalWatts[0]);
    }
    if (!selectedColor) {
      if (colors.length > 0) setSelectedColor(colors[0]);
      else if (additionalColors.length > 0)
        setSelectedAdditionalColor(additionalColors[0]);
    }
    if (!selectedSize && sizes.length > 0) setSelectedSize(sizes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]); // run when product changes

  if (isLoading) return <Loader />;
  if (isError || !product) return <div>Product not found</div>;

  const galleryImages: string[] = [
    product?.image,
    product?.image2,
    product?.image3,
  ].filter((img): img is string => typeof img === "string");

  // Compose selectedVariants object to pass to OrderForm
  const selectedVariants: { watt?: string; size?: string; color?: string } = {};
  if (selectedWatt || selectedAdditionalWatt)
    selectedVariants.watt = selectedWatt || selectedAdditionalWatt || undefined;
  if (selectedSize) selectedVariants.size = selectedSize;
  if (selectedColor || selectedAdditionalColor)
    selectedVariants.color =
      selectedColor || selectedAdditionalColor || undefined;

  const outOfStock = Number(product.quantity) <= 0;
  const disableOrder = isComingSoon || outOfStock;

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Main Image */}
        <Card className="overflow-hidden shadow-none py-0 h-fit relative">
          <div className="relative">
            <Zoom>
              {galleryImages[selectedImage] ? (
                <motion.img
                  src={`${import.meta.env.VITE_API_URL}${
                    galleryImages[selectedImage]
                  }`}
                  alt={product.name}
                  className={cn(
                    "w-full h-[300px] object-contain p-4 transition duration-300",
                    isComingSoon ? "blur-sm opacity-60" : ""
                  )}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <motion.div
                  className="w-full h-[300px] flex items-center justify-center bg-muted/30"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image className="w-24 h-24 text-muted-foreground" />
                </motion.div>
              )}
            </Zoom>

            {isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 text-base font-semibold bg-primary text-white rounded-lg backdrop-blur">
                  Coming Soon
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-2">
              {galleryImages.map((img: string, idx: number) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-20 h-20 rounded-lg border-2 overflow-hidden transition",
                    selectedImage === idx
                      ? "border-blue-600 ring-1 ring-blue-300"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}${img}`}
                    alt={`${product.name} view ${idx + 1}`}
                    className={cn(
                      "w-full h-full object-cover transition",
                      isComingSoon ? "blur-[1px] opacity-60" : ""
                    )}
                  />

                  {isComingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold bg-black/50 text-white">
                      Coming Soon
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </Card>

        {/* Right: Info + Actions */}
        <motion.div
          className="space-y-4 p-6 rounded-xl border bg-background/40 backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
            {product.name}
          </h1>

          <div className="flex items-end gap-3">
            {isComingSoon ? (
              <span className="text-2xl font-bold text-gray-500">
                Coming Soon
              </span>
            ) : (
              <span className="text-2xl font-bold text-primary">
                ৳{Number(product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* --- VARIANTS --- */}
          {/* Watt */}
          {watts.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Select Watt
              </label>
              <div className="flex flex-wrap gap-2">
                {watts.map((w: string, idx: number) => {
                  const isActive = selectedWatt === w;
                  return (
                    <Badge
                      key={idx}
                      onClick={() => {
                        // clear additional if selecting primary and vice versa
                        if (selectedAdditionalWatt === w)
                          setSelectedAdditionalWatt(null);
                        setSelectedWatt(isActive ? null : w);
                      }}
                      className={cn(
                        "cursor-pointer transition",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-secondary text-black"
                      )}
                    >
                      {w}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Watt */}
          {additionalWatts.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Watt</label>
              <div className="flex flex-wrap gap-2">
                {additionalWatts.map((w: string, idx: number) => {
                  const isActive = selectedAdditionalWatt === w;
                  return (
                    <Badge
                      key={idx}
                      onClick={() => {
                        if (selectedWatt === w) setSelectedWatt(null);
                        setSelectedAdditionalWatt(isActive ? null : w);
                      }}
                      className={cn(
                        "cursor-pointer transition",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-secondary text-black"
                      )}
                    >
                      {w}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color */}
          {colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Select Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((c: string, idx: number) => {
                  const isActive = selectedColor === c;
                  return (
                    <Badge
                      key={idx}
                      onClick={() => {
                        if (selectedAdditionalColor === c)
                          setSelectedAdditionalColor(null);
                        setSelectedColor(isActive ? null : c);
                      }}
                      className={cn(
                        "cursor-pointer transition",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-secondary text-black"
                      )}
                    >
                      {c}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Color */}
          {additionalColors.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Additional Color
              </label>
              <div className="flex flex-wrap gap-2">
                {additionalColors.map((c: string, idx: number) => {
                  const isActive = selectedAdditionalColor === c;
                  return (
                    <Badge
                      key={idx}
                      onClick={() => {
                        if (selectedColor === c) setSelectedColor(null);
                        setSelectedAdditionalColor(isActive ? null : c);
                      }}
                      className={cn(
                        "cursor-pointer transition",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-secondary text-black"
                      )}
                    >
                      {c}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size */}
          {sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s: string, idx: number) => {
                  const isActive = selectedSize === s;
                  return (
                    <Badge
                      key={idx}
                      onClick={() => setSelectedSize(isActive ? null : s)}
                      className={cn(
                        "cursor-pointer transition",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-secondary text-black"
                      )}
                    >
                      {s}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
          {/* --- END VARIANTS --- */}

          {/* Stock + Category Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Stock
              </dt>
              <dd
                className={cn(
                  "font-semibold mt-1 flex items-center gap-1",
                  !outOfStock ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="text-lg">●</span>
                {!outOfStock ? "In Stock" : "Out of Stock"}
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
                {product.subcategories?.name || "N/A"}
              </dd>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-row gap-3 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Order Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  disabled={disableOrder}
                  className={cn(
                    "flex-1 text-base font-medium gap-2",
                    disableOrder ? "opacity-60 cursor-not-allowed" : ""
                  )}
                >
                  <ShoppingCart className="w-5 h-5" />{" "}
                  {isComingSoon ? "Coming Soon" : "Order Now"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Place Your Order</DialogTitle>
                  <DialogDescription>
                    Fill in your details to complete the order
                  </DialogDescription>
                </DialogHeader>
                <OrderForm
                  productId={product._id}
                  productName={product.name}
                  maxQuantity={Number(product.quantity)}
                  selectedVariants={selectedVariants}
                  onSuccess={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 text-base font-medium gap-2"
                >
                  Distributor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Distributor</DialogTitle>
                  <DialogDescription>
                    <p className="flex gap-2">
                      Call:{" "}
                      <a
                        href="tel:+8801835926605"
                        className="flex items-center gap-2 font-bold hover:text-primary transition"
                      >
                        +880 1835 926 605
                      </a>
                    </p>{" "}
                    Or Toll-Free: <strong>08000016267</strong>
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

      {/* Bottom Section: Tabs + Related Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-4 shadow-none">
            <Tabs defaultValue="descriptions" className="w-full mt-2">
              <TabsList className="px-1 flex flex-wrap sm:space-x-1">
                {["descriptions", "specifications", "features", "gallery"].map(
                  (tab) => (
                    <TabsTrigger key={tab} value={tab}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  )
                )}
              </TabsList>

              <div className="px-2 pt-4 bg-background rounded-b-xl space-y-6">
                <TabsContent value="descriptions">
                  {product.descriptions ? (
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {product.descriptions}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      No technical descriptions available.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="specifications">
                  {product.meta?.specifications ||
                  product.meta?.voltage ||
                  product.meta?.current ? (
                    <ul className="space-y-1 text-foreground">
                      {product.meta?.specifications
                        ?.split(",")
                        .filter(Boolean)
                        .map((f: string, idx: number) => (
                          <li key={idx}>{f.trim()}</li>
                        ))}
                      {product.meta?.voltage && (
                        <li>
                          <strong>Voltage:</strong> {product.meta.voltage}
                        </li>
                      )}
                      {product.meta?.current && (
                        <li>
                          <strong>Current:</strong> {product.meta.current}
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      No technical specifications available.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="features">
                  {product.meta?.features ? (
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {product.meta.features
                        .split(",")
                        .filter(Boolean)
                        .map((f: string, idx: number) => (
                          <li key={idx}>{f}</li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      No feature details available.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="gallery">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((img: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <Zoom>
                          <Avatar className="w-32 h-32 rounded-lg overflow-hidden relative">
                            <AvatarImage
                              src={`${import.meta.env.VITE_API_URL}${img}`}
                              alt={`View ${idx + 1}`}
                              className={cn(
                                "object-cover w-full h-full",
                                isComingSoon ? "blur-[1px] opacity-60" : ""
                              )}
                            />
                            {isComingSoon && (
                              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold bg-black/40 text-white">
                                Coming Soon
                              </div>
                            )}
                          </Avatar>
                        </Zoom>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </motion.div>

        <div>
          <ProductCard
            slug={
              product?.subcategories?.slug || product?.category_id?.slug || ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SubcatProductDetailsPage;
