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
import { Input } from "@/components/ui/input";
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
  useImportProductsMutation,
} from "@/redux/api/baseApi";
import { ImportExportButtons } from "@/components/shared/ImportExportButtons";
import type { IVariant } from "@/types/product";
import { Edit, Image, Loader2, RefreshCcw, Trash, GripVertical, Copy, ChevronDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
function SortableTableRow({ id, disabled, children, ...props }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

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
        className={`w-[40px] text-center ${disabled ? '' : 'cursor-grab active:cursor-grabbing'}`}
        {...(disabled ? {} : attributes)}
        {...(disabled ? {} : listeners)}
      >
        {!disabled && <GripVertical className="h-5 w-5 text-gray-400 mx-auto hover:text-gray-700" />}
      </TableCell>
      {children}
    </TableRow>
  );
}

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: productsData, refetch } = useGetAllProductsQuery(debouncedSearch);
  const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [reorderProducts] = useReorderProductsMutation();
  const [importProducts] = useImportProductsMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // New Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("ALL");
  const [productsList, setProductsList] = useState<any[]>([]);
  
  const categories = categoriesData?.data || [];

  const isSearching = debouncedSearch.trim().length > 0;

  // Filter products whenever data or selected category/subcategory changes
  useEffect(() => {
    if (productsData?.data) {
      let filtered = productsData.data;

      if (selectedCategory !== "ALL") {
        filtered = filtered.filter((p: any) => {
          const catId = p.category_id?._id || p.category_id;
          return String(catId) === String(selectedCategory);
        });
      }

      if (selectedSubcategory !== "ALL") {
        filtered = filtered.filter((p: any) => {
          if (!p.subcategories) return false;
          if (Array.isArray(p.subcategories)) {
            return p.subcategories.some((sub: any) => {
              const subId = sub?._id || sub;
              return String(subId) === String(selectedSubcategory);
            });
          }
          const subId = p.subcategories?._id || p.subcategories;
          return String(subId) === String(selectedSubcategory);
        });
      }

      setProductsList(filtered);
    }
  }, [productsData, selectedCategory, selectedSubcategory]);

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
      if (editingProduct && !editingProduct.isDuplicate) {
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

  const handleDuplicate = (product: any) => {
    setEditingProduct({ ...product, isDuplicate: true });
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
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[200px]"
          />
          {/* Category/Subcategory Nested Popover Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[230px] justify-between text-left font-normal h-9 border ${
                  selectedCategory !== "ALL"
                    ? "border-primary/50 bg-primary/5 font-medium text-foreground"
                    : "border-border/60"
                }`}
              >
                <span className="truncate text-xs sm:text-sm">
                  {selectedCategory === "ALL" 
                    ? "All Categories" 
                    : categories.find((c:any) => String(c._id) === String(selectedCategory))?.name || "Category"}
                  {selectedCategory !== "ALL" && selectedSubcategory !== "ALL" 
                    ? ` > ${categories.find((c:any) => String(c._id) === String(selectedCategory))?.subcategories?.find((s:any) => String(s._id) === String(selectedSubcategory))?.name || ""}` 
                    : ""}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[260px] p-2 max-h-[380px] overflow-y-auto">
              <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 mb-1">
                Filter Products
              </div>

              {/* All Categories Option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSelectedSubcategory("ALL");
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-sm text-left transition-colors cursor-pointer ${
                  selectedCategory === "ALL" && selectedSubcategory === "ALL"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <span>All Categories</span>
                {selectedCategory === "ALL" && selectedSubcategory === "ALL" && (
                  <Check className="h-4 w-4 shrink-0" />
                )}
              </button>

              <div className="h-px bg-border my-1.5" />

              {/* Category & Subcategory List */}
              <div className="space-y-1">
                {categories.map((cat: any) => {
                  const catIdStr = String(cat._id);
                  const hasSub = cat.subcategories && cat.subcategories.length > 0;
                  const isCatAllActive = String(selectedCategory) === catIdStr && selectedSubcategory === "ALL";

                  if (hasSub) {
                    return (
                      <div key={catIdStr} className="space-y-1 pt-1">
                        <div className="text-xs font-bold text-primary px-2.5 pt-1 uppercase tracking-wider">
                          {cat.name}
                        </div>
                        
                        {/* Option to select All of this category */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(catIdStr);
                            setSelectedSubcategory("ALL");
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs sm:text-sm text-left transition-colors cursor-pointer pl-4 ${
                            isCatAllActive
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <span>All {cat.name}</span>
                          {isCatAllActive && <Check className="h-3.5 w-3.5 shrink-0" />}
                        </button>

                        {/* Subcategory items */}
                        {cat.subcategories.map((sub: any) => {
                          const subIdStr = String(sub._id);
                          const isSubActive =
                            String(selectedCategory) === catIdStr &&
                            String(selectedSubcategory) === subIdStr;

                          return (
                            <button
                              type="button"
                              key={subIdStr}
                              onClick={() => {
                                setSelectedCategory(catIdStr);
                                setSelectedSubcategory(subIdStr);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs sm:text-sm text-left transition-colors cursor-pointer pl-6 ${
                                isSubActive
                                  ? "bg-primary text-primary-foreground font-semibold"
                                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <span>{sub.name}</span>
                              {isSubActive && <Check className="h-3.5 w-3.5 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  }

                  const isDirectCatActive = String(selectedCategory) === catIdStr;
                  return (
                    <button
                      type="button"
                      key={catIdStr}
                      onClick={() => {
                        setSelectedCategory(catIdStr);
                        setSelectedSubcategory("ALL");
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                        isDirectCatActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <span className="font-medium">{cat.name}</span>
                      {isDirectCatActive && <Check className="h-3.5 w-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          <ImportExportButtons
            title="Products"
            exportEndpoint={`/product/export?category=${selectedCategory}&subcategory=${selectedSubcategory}`}
            importMutation={importProducts}
            onSuccess={refetch}
            sampleHeaders={[
              "name",
              "category",
              "subcategory",
              "price",
              "quantity",
              "descriptions",
              "order",
              "image",
              "image2",
              "image3",
              "variants",
              "meta"
            ]}
            sampleData={`name,category,subcategory,price,quantity,descriptions,order,image,image2,image3,variants,meta\r\n"18W LED T-Bulb","LED Lighting","LED Bulb",350,100,"Energy efficient 18W bulb",0,"/uploads/categories/sample1.png","","",,"{""color"":""Daylight""}"\r\n"Direct LED Light","LED Lighting","",450,50,"Direct LED without subcategory",1,"","","",,""\r\n"Smart 2-Gang Switch","Switch & Socket","Gang Switch",650,20,"Wi-Fi smart dual switch",0,"","","",,""\r\n`}
          />

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
                    <SortableTableRow key={product._id} id={product._id} disabled={isSearching}>
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
                          onClick={() => handleDuplicate(product)}
                        >
                          <Copy />
                        </Button>
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
              {editingProduct && !editingProduct.isDuplicate ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {editingProduct && !editingProduct.isDuplicate ? "Update product details" : "Add a new product"}
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
