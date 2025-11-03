// ...other imports remain the same
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/redux/api/baseApi";
import { Edit, Image, Loader2, RefreshCcw, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  const [quantity, setQuantity] = useState<number>(0); // <-- Quantity
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [metaFields, setMetaFields] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch(); // refetch returns a promise
    } finally {
      setRefreshing(false);
    }
  };

  // Load form when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setPrice(editingProduct.price || 0);
      setQuantity(editingProduct.quantity || 0);
      setCategory(editingProduct.category_id?._id || null);

      // ✅ Fix subcategory parsing
      if (Array.isArray(editingProduct.subcategories)) {
        setSubcategory(editingProduct.subcategories?.[0]?._id || "");
      } else if (typeof editingProduct.subcategories === "string") {
        setSubcategory(editingProduct.subcategories);
      } else if (editingProduct.subcategories?._id) {
        setSubcategory(editingProduct.subcategories._id);
      } else {
        setSubcategory("");
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
      setQuantity(0);
      setCategory(null);
      setSubcategory(null);
      setImageFile(null);
      setMetaFields([{ key: "", value: "" }]);
    }
  }, [editingProduct, categories, dialogOpen]);

  // Meta handlers remain the same
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
    formData.append("quantity", quantity.toString()); // <-- append quantity
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

  // Delete handler remains the same
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
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              setEditingProduct(null);
              setDialogOpen(true);
            }}>
            + Add Product
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}>
            <RefreshCcw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Product Table */}
      <div className="rounded-md border border-border shadow-none bg-card  overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead className="w-16 text-center">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product: any, index: number) => (
                <TableRow key={product._id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    <Avatar className="rounded size-8">
                      <AvatarImage
                        className="rounded"
                        src={
                          product.image
                            ? `${import.meta.env.VITE_API_URL}${product.image}`
                            : undefined
                        }
                        alt={product.name}
                      />
                      <AvatarFallback className="rounded">
                        <Image className="size-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category_id?.name || "N/A"}</TableCell>
                  <TableCell>৳{product.price}</TableCell>
                  <TableCell>{product.quantity || 0}</TableCell>{" "}
                  {/* <-- show quantity */}
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
                  colSpan={8}
                  className="text-center py-6 text-gray-500">
                  <div className="flex items-center gap-1 justify-center">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
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
        <DialogContent className="max-w-full sm:max-w-3xl w-[95vw] md:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl md:text-2xl font-semibold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {editingProduct ? "Update product details" : "Add a new product"}
            </DialogDescription>
          </DialogHeader>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter price"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Enter quantity"
              />
            </div>

            {/* Category & Subcategory */}

            <div className="space-y-2 w-full">
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

            <div className="space-y-2 w-full">
              <Label>Subcategory</Label>
              <Select onValueChange={setSubcategory} value={subcategory || ""}>
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
            {/* Image Upload */}
            <div className="space-y-2">
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
                  className="mt-2 w-16 h-16 object-cover rounded-md border"
                />
              )}
            </div>
            {/* Meta Fields */}
            <div className="flex flex-col gap-3 md:col-span-2">
              <Label>Meta Fields</Label>
              <div className="flex flex-col gap-3">
                {metaFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-3 w-full">
                    <Input
                      placeholder="Key (e.g., brand)"
                      value={field.key}
                      onChange={(e) =>
                        handleMetaChange(index, "key", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Value (e.g., -Apple)"
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
                        className="self-center"
                        onClick={() => handleRemoveMetaField(index)}>
                        <X className="size-4" />
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
            </div>

            {/* Save Button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <Button
                size="lg"
                className="px-8 w-full sm:w-auto"
                onClick={handleSave}>
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
