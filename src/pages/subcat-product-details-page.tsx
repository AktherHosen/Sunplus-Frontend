import Loader from "@/components/loader";
import { useGetProductsByCategoryAndSubcategoryQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BASE_URL = "http://localhost:5001";

const SubcatProductDetailsPage = () => {
  const { categorySlug, subCategorySlug, productSlug } = useParams();

  const { data, isLoading, isError } =
    useGetProductsByCategoryAndSubcategoryQuery({
      categorySlug: categorySlug!,
      subSlug: subCategorySlug!,
      productSlug: productSlug!,
    });

  const product = data?.data;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
  {/* --- Product Info Card --- */}
  <Card className="0">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-gray-800">
        Product Details
      </CardTitle>
    </CardHeader>

    <CardContent className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
          <Loader />
        </div>
      )}

      {!isLoading && (isError || !product) && (
        <div className="text-red-500 text-center py-20">
          Failed to load product details.
        </div>
      )}

      {!isLoading && product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Image */}
          <div className="overflow-hidden rounded-lg">
            <Zoom>
              <img
                src={
                  product.image
                    ? `${BASE_URL}${product.image}`
                    : "https://via.placeholder.com/400x300"
                }
                alt={product.name}
                className="w-full object-cover rounded transition-transform duration-300 hover:scale-105"
              />
            </Zoom>
          </div>

          {/* Right: Product Info */}
          <div className="py-10">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-gray-700 text-lg font-medium mb-3">
              Price: <span className="text-green-600 font-semibold">${product.price}</span>
            </p>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-semibold">Category:</span> {product.category_id?.name}</p>
              <p><span className="font-semibold">Subcategory:</span> {product.subcategories?.name}</p>
            </div>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </CardContent>
  </Card>

  {/* --- Tabs Section (Outside Card) --- */}
  {!isLoading && product && (
    <div className="p-6">
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="flex flex-wrap justify-start gap-2 bg-gray-100 p-2 rounded-lg">
          <TabsTrigger value="features" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Features</TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Picture Gallery</TabsTrigger>
          <TabsTrigger value="specs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Technical Specification</TabsTrigger>
          <TabsTrigger value="supports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Supports</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Product Features</h2>
          <p className="text-gray-700">{product.features || "No feature details available."}</p>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Picture Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Zoom>
              <img
                src={product.image ? `${BASE_URL}${product.image}` : "https://via.placeholder.com/400x300"}
                alt="Main product"
                className="rounded-lg object-cover h-48 w-full"
              />
            </Zoom>
            {product.gallery?.length
              ? product.gallery.map((img: string, idx: number) => (
                  <Zoom key={idx}>
                    <img
                      src={`${BASE_URL}${img}`}
                      alt={`Gallery ${idx}`}
                      className="rounded-lg object-cover h-48 w-full"
                    />
                  </Zoom>
                ))
              : null}
          </div>
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Technical Specifications</h2>
          <p className="text-gray-700">{product.specifications || "No technical details available."}</p>
        </TabsContent>

        <TabsContent value="supports" className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Support</h2>
          <p className="text-gray-700">{product.supports || "No support information is currently available."}</p>
        </TabsContent>
      </Tabs>
    </div>
  )}
</div>

  );
};

export default SubcatProductDetailsPage;
