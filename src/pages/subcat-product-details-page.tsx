import { Check, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useParams } from "react-router";

// Shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// API
import Loader from "@/components/loader";
import { useGetProductsByCategoryAndSubcategoryQuery } from "@/redux/api/baseApi";

import "react-medium-image-zoom/dist/styles.css";

// Shadcn/ui components
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

// API

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
    ? [product.image, ...(product.gallery || [])]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* --- Product Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Main Image */}
          <Card className="overflow-hidden shadow-none h-fit">
            <Zoom>
              <img
                src={
                  galleryImages[selectedImage]
                    ? `${import.meta.env.VITE_API_URL}${
                        galleryImages[selectedImage]
                      }`
                    : "/api/placeholder/600/600"
                }
                alt={product.name}
                className="w-full h-[300px] object-contain p-4"
              />
            </Zoom>
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition ${
                      selectedImage === idx
                        ? "border-blue-600 ring-1 ring-blue-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <img
                      src={`${import.meta.env.VITE_API_URL}${img}`}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Right: Info + Actions */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="line-through text-gray-400">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-gray-600">
              {product.shortDescription ||
                "Premium product with exceptional quality."}
            </p>

            <div
              className={`flex items-center gap-1 text-sm ${
                Number(product.quantity) > 0 ? "text-green-600" : "text-red-600"
              }`}>
              {Number(product.quantity) > 0 ? (
                <span>● In Stock</span>
              ) : (
                <span>● Out of Stock</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex w-fit gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    disabled={Number(product.quantity) <= 0}
                    className="flex-1">
                    <ShoppingCart className="w-5 h-5 mr-2" /> Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <OrderForm
                    productId={product._id}
                    productName={product.name}
                    maxQuantity={product.quantity}
                    onSuccess={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="flex-1">
                    Buy Now
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
                      <Button>Close</Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Category Info */}
            <Card className="p-3 shadow-none">
              <CardContent className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="font-semibold">Category</dt>
                  <dd className="text-gray-600">{product.category_id?.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Subcategory</dt>
                  <dd className="text-gray-600">
                    {product.subcategories?.name}
                  </dd>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="p-4 shadow-none">
          <Tabs defaultValue="features" className="w-full mt-2">
            <TabsList className=" px-1 flex space-x-1">
              {["features", "specs", "gallery", "support"].map((tab) => (
                <TabsTrigger key={tab} value={tab} className="">
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
                    <Zoom key={idx}>
                      <Avatar className="w-32 h-32 rounded-lg overflow-hidden">
                        <AvatarImage
                          src={`${import.meta.env.VITE_API_URL}${img}`}
                          alt={`View ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </Avatar>
                    </Zoom>
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
      </div>
    </div>
  );
};

export default SubcatProductDetailsPage;
