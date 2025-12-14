import { ProductForm } from "@/components/product/ProductForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { IVariant } from "@/types/product";
import { Edit, Image, Loader2, RefreshCcw, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const { data: productsData, refetch } = useGetAllProductsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSave = async (formData: FormData) => {
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
      throw err;
    }
  };

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

  const handleOpenDialog = (product?: any) => {
    setEditingProduct(product || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleOpenDialog()}>
            + Add Product
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCcw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Product Table */}
      <div className="rounded-md border border-border shadow-none bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead className="w-16 text-center">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price / Variants</TableHead>
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
                  <TableCell>
                    {product.variants && product.variants.length > 0 ? (
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          {product.variants.length} variant
                          {product.variants.length > 1 ? "s" : ""}
                        </div>
                        <div className="text-xs">
                          ৳
                          {Math.min(
                            ...product.variants.map((v: IVariant) => v.price)
                          )}{" "}
                          - ৳
                          {Math.max(
                            ...product.variants.map((v: IVariant) => v.price)
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>৳{product.price || 0}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.variants && product.variants.length > 0
                      ? product.variants.reduce(
                          (sum: number, v: IVariant) => sum + (v.quantity || 0),
                          0
                        )
                      : product.quantity || 0}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
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
      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-full sm:max-w-4xl w-[95vw] md:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl md:text-2xl font-semibold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {editingProduct ? "Update product details" : "Add a new product"}
            </DialogDescription>
          </DialogHeader>

          <ProductForm
            editingProduct={editingProduct}
            categories={categories}
            onSave={handleSave}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductPage;
