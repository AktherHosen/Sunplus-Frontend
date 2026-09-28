import { useEffect, useState } from "react";
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
  useReorderProductsMutation,
} from "@/redux/api/baseApi";
import type { IVariant } from "@/types/product";
import { Edit, Image, Loader2, RefreshCcw, Trash, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Reusable Sortable Table Row Component
function SortableTableRow({ id, children, ...props }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...props}>
      <TableCell
        className="w-[40px] cursor-grab active:cursor-grabbing text-center"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5 text-gray-400 mx-auto hover:text-gray-700" />
      </TableCell>
      {children}
    </TableRow>
  );
}

const ProductPage = () => {
  const { data: productsData, refetch } = useGetAllProductsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [reorderProducts] = useReorderProductsMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // New Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [productsList, setProductsList] = useState<any[]>([]);
  
  const categories = categoriesData?.data || [];

  // Filter products whenever data or selected category changes
  useEffect(() => {
    if (productsData?.data) {
      if (selectedCategory === "ALL") {
        setProductsList(productsData.data);
      } else {
        setProductsList(
          productsData.data.filter(
            (p: any) => p.category_id?._id === selectedCategory
          )
        );
      }
    }
  }, [productsData, selectedCategory]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = productsList.findIndex((item) => item._id === active.id);
      const newIndex = productsList.findIndex((item) => item._id === over.id);

      const newItems = arrayMove(productsList, oldIndex, newIndex);
      setProductsList(newItems); // Optimistic UI update

      // Save to backend
      const updates = newItems.map((item, index) => ({
        id: item._id,
        order: index,
      }));

      try {
        await reorderProducts(updates).unwrap();
        toast.success("Products reordered successfully!");
      } catch (error: any) {
        toast.error("Failed to reorder products");
        refetch(); // Revert
      }
    }
  };

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-input bg-background rounded-md px-3 py-1.5 text-sm h-9 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
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
              {productsList.length > 0 ? (
                <SortableContext
                  items={productsList.map((p) => p._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {productsList.map((product: any, index: number) => (
                    <SortableTableRow key={product._id} id={product._id}>
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
                    </SortableTableRow>
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-gray-500"
                  >
                    <div className="flex items-center gap-1 justify-center">
                      {productsData === undefined ? (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      ) : (
                        <p className="text-gray-500 text-sm">No Products found for this category.</p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-full sm:max-w-6xl w-[95vw] md:w-full max-h-[90vh] overflow-y-auto">
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
