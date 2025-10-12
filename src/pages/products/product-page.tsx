import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/redux/api/baseApi";
import { X } from "lucide-react";

const ProductPage = () => {
  const { data: productsData, refetch } = useGetAllProductsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Dynamic meta fields
  const [metaFields, setMetaFields] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  // Load form when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setPrice(editingProduct.price || 0);
      setCategory(editingProduct.category_id?._id || null);
      setSubcategory(editingProduct.subcategories?.[0]?._id || null);
      setImageFile(null);

      if (editingProduct.meta && typeof editingProduct.meta === "object") {
        const metaArray = Object.entries(editingProduct.meta).map(
          ([key, value]) => ({
            key,
            value: String(value),
          })
        );
        setMetaFields(metaArray.length ? metaArray : [{ key: "", value: "" }]);
      } else {
        setMetaFields([{ key: "", value: "" }]);
      }
    } else {
      // Reset form
      setName("");
      setPrice(0);
      setCategory(null);
      setSubcategory(null);
      setImageFile(null);
      setMetaFields([{ key: "", value: "" }]);
    }
  }, [editingProduct, dialogOpen]);

  // Meta handlers
  const handleAddMetaField = () =>
    setMetaFields([...metaFields, { key: "", value: "" }]);
  const handleRemoveMetaField = (index: number) =>
    setMetaFields(metaFields.filter((_, i) => i !== index));

  const handleMetaChange = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    const updated = [...metaFields];
    updated[index][field] = newValue;
    setMetaFields(updated);
  };

  // Save product
  const handleSave = async () => {
    if (!name.trim() || !price || !category) {
      toast.error("Name, price, and category are required");
      return;
    }

    const metaObject = metaFields.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value.trim();
      return acc;
    }, {} as Record<string, any>);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("category_id", category);
    if (subcategory) formData.append("subcategories", subcategory);
    if (imageFile) formData.append("image", imageFile);
    formData.append("meta", JSON.stringify(metaObject));

    try {
      if (editingProduct) {
        await updateProduct({ slug: editingProduct.slug, formData }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await addProduct(formData).unwrap();
        toast.success("Product added successfully!");
      }
      setDialogOpen(false);
      setEditingProduct(null);
      refetch();
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  // Delete product
  const handleDelete = (id: string) => {
    toast.warning("Are you sure you want to delete this product?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteProduct(id).unwrap();
            toast.success("Product deleted successfully!");
            refetch();
          } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete product");
          }
        },
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setDialogOpen(true);
          }}
        >
          + Add Product
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <Card
            key={product._id}
            className="overflow-hidden hover:shadow-lg transition"
          >
            <CardHeader className="p-0">
              <img
                src={
                  product.image
                    ? `${import.meta.env.VITE_API_URL}${product.image}`
                    : "https://via.placeholder.com/300x200"
                }
                alt={product.name}
                className="w-full h-40 object-cover"
              />
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <CardTitle className="text-center text-lg">
                {product.name}
              </CardTitle>
              <p className="text-center font-semibold">${product.price}</p>
              <p className="text-center text-sm text-gray-500">
                Category: {product.category_id?.name || "N/A"} <br />
                Subcategory: {product.subcategories?.[0]?.name || "N/A"}
              </p>
              <div className="flex justify-between mt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingProduct(product);
                    setDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {editingProduct ? "Update product details" : "Add a new product"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter price"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-4 md:col-span-1">
              <div className="flex flex-col gap-2 w-full">
                <Label>Category</Label>
                <Select onValueChange={setCategory} value={category || ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {categories.map((cat: any) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label>Subcategory</Label>
                <Select
                  onValueChange={setSubcategory}
                  value={subcategory || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subcategory (optional)" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {categories
                      ?.find((c: any) => c._id === category)
                      ?.subcategories?.map((sub: any) => (
                        <SelectItem key={sub._id} value={sub._id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Meta Fields */}
            <div className="flex flex-col space-y-2 row-span-2">
              <Label>Meta Fields</Label>
              <div className="flex flex-col gap-2 overflow-y-auto">
                {metaFields.map((field, index) => (
                  <div key={index} className="flex gap-4">
                    <Input
                      placeholder="Key (e.g., brand)"
                      value={field.key}
                      onChange={(e) =>
                        handleMetaChange(index, "key", e.target.value)
                      }
                      className="focus:outline-none"
                    />
                    <Input
                      placeholder="Value (e.g., Apple)"
                      value={field.value}
                      onChange={(e) =>
                        handleMetaChange(index, "value", e.target.value)
                      }
                      className="focus:outline-none"
                    />
                    {metaFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveMetaField(index)}
                      >
                        <X />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMetaField}
              >
                + Add Meta Field
              </Button>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) =>
                  e.target.files && setImageFile(e.target.files[0])
                }
              />
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded-md border"
                />
              )}
            </div>

            {/* Save Button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <Button size="lg" className="px-8" onClick={handleSave}>
                {editingProduct ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductPage;
