import { Check, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useParams } from "react-router";

// Shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// API
import Loader from "@/components/loader";
import { useGetProductsByCategoryAndSubcategoryQuery } from "@/redux/api/baseApi";

import "react-medium-image-zoom/dist/styles.css";

// Shadcn/ui components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden shadow-none border-border h-fit">
              <div className="relative ">
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
                    className="w-full max-h-[320px] object-contain p-4"
                  />
                </Zoom>

                <div className="absolute top-4 left-4 flex flex-col justify-self-end gap-2">
                
                    <div
                className={`flex items-center gap-1 py-2 text-sm ${
                  Number(product.quantity.length) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {Number(product.quantity.length) > 0 ? (
                  <>
                     <Badge variant="default">Available</Badge>
                  </>
                ) : (
                  <>
                      <Badge variant="destructive" className="text-accent">Available</Badge>
                  </>
                )}
              </div>
                  {product.isNew && (
                    <Badge variant="secondary">New Arrival</Badge>
                  )}
                </div>
              </div>
            </Card>

            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index
                        ? "border-blue-600 ring-2 ring-blue-600/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <img
                      src={`${import.meta.env.VITE_API_URL}${img}`}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="line-through text-gray-500">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.shortDescription ||
                  "Premium product with exceptional quality."}
              </p>
              <div
                className={`flex items-center gap-1 py-2 text-sm ${
                  Number(product.quantity.length) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {Number(product.quantity.length) > 0 ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    <span>Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="h-12">
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
              </Button>

              {/* Buy Now triggers Dialog */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-12">
                    Buy Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Contact Distributor</DialogTitle>
                    <DialogDescription>
                      পণ্য ক্রয়ের জন্য স্থানীয় বিক্রয় প্রতিনিধির সাথে সরাসরি
                      ফোনে যোগাযোগ করতে পারেন।
                      <br />
                      কল করুন: <strong>01686691262</strong> বা টোল ফ্রী:{" "}
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

            {/* Product Details Card */}
            <Card>
              <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
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

        <Card className="pt-0">
          <Tabs defaultValue="features" className="w-full px-2 mt-2">
            <TabsList className="bg-background  px-1 flex space-x-1">
              {["features", "specs", "gallery", "support"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 text-center p-4 rounded text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow transition-all hover:bg-secondary hover:text-primary">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            <div className="p-6 bg-white rounded-b-xl space-y-6">
              {/* Features */}
              <TabsContent value="features">
                {product.features ? (
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {product.features}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    No feature details available.
                  </p>
                )}
              </TabsContent>

              {/* Specifications */}
              <TabsContent value="specs">
                {product.specifications ? (
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {product.specifications}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    No technical specifications available.
                  </p>
                )}
              </TabsContent>

              {/* Gallery */}
              <TabsContent value="gallery">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages.map((img, idx) => (
                    <Zoom key={idx}>
                      <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow rounded-lg p-0">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${img}`}
                          alt={`View ${idx + 1}`}
                          className="w-full h-fit object-cover cursor-zoom-in rounded-lg"
                        />
                      </Card>
                    </Zoom>
                  ))}
                </div>
              </TabsContent>

              {/* Support */}
              <TabsContent value="support">
                {product.supports ? (
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {product.supports}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
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
