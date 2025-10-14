import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/redux/api/baseApi";
import { Edit, Loader2, Trash, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/loader";
import { Spinner } from "@/components/ui/spinner";

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

  const [metaFields, setMetaFields] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  // Load form when editing
  // useEffect(() => {
  //   if (editingProduct) {
  //     setName(editingProduct.name || "");
  //     setPrice(editingProduct.price || 0);
  //     setCategory(editingProduct.category_id?._id || null);
  //     setSubcategory(editingProduct.subcategories?.[0]?._id || null);
  //     setImageFile(null);

  //     if (editingProduct.meta && typeof editingProduct.meta === "object") {
  //       const metaArray = Object.entries(editingProduct.meta).map(
  //         ([key, value]) => ({
  //           key,
  //           value: String(value),
  //         })
  //       );
  //       setMetaFields(metaArray.length ? metaArray : [{ key: "", value: "" }]);
  //     } else {
  //       setMetaFields([{ key: "", value: "" }]);
  //     }
  //   } else {
  //     setName("");
  //     setPrice(0);
  //     setCategory(null);
  //     setSubcategory(null);
  //     setImageFile(null);
  //     setMetaFields([{ key: "", value: "" }]);
  //   }
  // }, [editingProduct, dialogOpen]);
useEffect(() => {
  if (editingProduct) {
    setName(editingProduct.name || "");
    setPrice(editingProduct.price || 0);
    setCategory(editingProduct.category_id?._id || null);

    // Correctly handle subcategory
    if (editingProduct.subcategories) {
      setSubcategory(editingProduct.subcategories._id); // <- just use _id
    } else {
      setSubcategory(null);
    }

    setImageFile(null);

    if (editingProduct.meta && typeof editingProduct.meta === "object") {
      const metaArray = Object.entries(editingProduct.meta).map(
        ([key, value]) => ({ key, value: String(value) })
      );
      setMetaFields(metaArray.length ? metaArray : [{ key: "", value: "" }]);
    } else {
      setMetaFields([{ key: "", value: "" }]);
    }
  } else {
    setName("");
    setPrice(0);
    setCategory(null);
    setSubcategory(null);
    setImageFile(null);
    setMetaFields([{ key: "", value: "" }]);
  }
}, [editingProduct, categories, dialogOpen]);

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
      toast.error(err?.data?.message || "Failed to save product");
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setDialogOpen(true);
          }}>
          + Add Product
        </Button>
      </div>

      {/* Product Table */}
      <div className="rounded-md border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead className="w-16 text-center">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product: any, index: number) => (
                <TableRow key={product._id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    <Avatar>
                      <AvatarImage
                        src={
                          product.image
                            ? `${import.meta.env.VITE_API_URL}${product.image}`
                            : "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                      />
                      <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category_id?.name || "N/A"}</TableCell>
                  <TableCell>
                    {product.subcategories?.[0]?.name || "N/A"}
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => {
                        setEditingProduct(product);
                        setDialogOpen(true);
                      }}>
                      <Edit />
                    </Button>
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => handleDelete(product._id)}>
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500 ">
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-4 h-4 mx-auto text-primary animate-spin" />
                    <p className="text-primary">Loading...</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
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

            {/* Category / Subcategory */}
            <div className="flex flex-col gap-4 md:col-span-2">
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select onValueChange={setCategory} value={category || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Subcategory</Label>
                <Select
                  onValueChange={setSubcategory}
                  value={subcategory || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory (optional)" />
                  </SelectTrigger>
                  <SelectContent>
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
            <div className="flex flex-col space-y-2 md:col-span-2">
              <Label>Meta Fields</Label>
              {metaFields.map((field, index) => (
                <div key={index} className="flex gap-4">
                  <Input
                    placeholder="Key (e.g., brand)"
                    value={field.key}
                    onChange={(e) =>
                      handleMetaChange(index, "key", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Value (e.g., Apple)"
                    value={field.value}
                    onChange={(e) =>
                      handleMetaChange(index, "value", e.target.value)
                    }
                  />
                  {metaFields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveMetaField(index)}>
                      <X />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMetaField}>
                + Add Meta Field
              </Button>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
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
