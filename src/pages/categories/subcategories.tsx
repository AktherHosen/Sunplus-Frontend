/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CategoryForm from "@/components/categories/CategoryForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  useDeleteCategoryMutation,
  useGetAllSubCategoriesQuery,
  useReorderCategoriesMutation,
  useGetAllCategoriesQuery,
  useImportSubCategoriesMutation,
  useToggleCategoryStatusMutation,
} from "@/redux/api/baseApi";
import { ImportExportButtons } from "@/components/shared/ImportExportButtons";
import { Switch } from "@/components/ui/switch";
import { Image, Trash, GripVertical, Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function Subcategories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError, refetch } = useGetAllSubCategoriesQuery({
    searchTerm: debouncedSearch,
    includeInactive: true,
  });
  const { data: categoriesData } = useGetAllCategoriesQuery({ includeInactive: true });
  const [deleteCategory] = useDeleteCategoryMutation();
  const [reorderCategories] = useReorderCategoriesMutation();
  const [importSubCategories] = useImportSubCategoriesMutation();
  const [toggleCategoryStatus] = useToggleCategoryStatusMutation();

  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const handleToggleStatus = async (sub: any) => {
    const newStatus = sub.isActive !== false ? false : true;
    setSubcategories((prev) =>
      prev.map((s) => (s._id === sub._id ? { ...s, isActive: newStatus } : s))
    );
    try {
      await toggleCategoryStatus({ id: sub._id, isActive: newStatus }).unwrap();
      toast.success(`Subcategory "${sub.name}" ${newStatus ? "enabled" : "disabled"}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update subcategory status");
      refetch();
    }
  };

  const categories = categoriesData?.data || [];

  const isSearching = debouncedSearch.trim().length > 0;

  useEffect(() => {
    if (data?.data) {
      if (selectedCategory === "ALL") {
        setSubcategories(data.data);
      } else {
        setSubcategories(
          data.data.filter(
            (sub: any) => sub.parent?._id === selectedCategory
          )
        );
      }
    }
  }, [data, selectedCategory]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = subcategories.findIndex((item) => item._id === active.id);
      const newIndex = subcategories.findIndex((item) => item._id === over.id);

      const newItems = arrayMove(subcategories, oldIndex, newIndex);
      setSubcategories(newItems); // Optimistic update

      // Save to backend
      const updates = newItems.map((item, index) => ({
        id: item._id,
        order: index,
      }));

      try {
        await reorderCategories(updates).unwrap();
        toast.success("Subcategories reordered successfully!");
      } catch (error: any) {
        toast.error("Failed to reorder subcategories");
        refetch(); // Revert
      }
    }
  };

  const handleDelete = (sub: any) => {
    toast.warning(`Delete "${sub.name}"?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteCategory(sub._id).unwrap();
            toast.success(`"${sub.name}" deleted successfully 🗑️`);
            refetch();
          } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete subcategory");
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => toast.dismiss() },
    });
  };

  if (isLoading)
    return <p className="text-center p-4">Loading subcategories...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load subcategories.</p>
    );

  return (
    <div className="p-6 space-y-6 container mx-auto px-4 lg:px-0 py-2.5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Subcategories</h1>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Search subcategories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[200px]"
          />
          {/* Category Filter Dropdown */}
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {categories.map((cat: any) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CategoryForm triggerText="+ Add Subcategory" onSuccess={refetch} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-9 w-9 p-0"
            title="Refresh"
          >
            <RefreshCcw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>
          <ImportExportButtons
            title="Subcategories"
            exportEndpoint="/category/sub-categories/export"
            importMutation={importSubCategories}
            onSuccess={refetch}
            sampleHeaders={["name", "category", "order", "new_arrival"]}
            sampleData={"name,category,order,new_arrival\r\nLED Bulb,LED Lighting,0,false\r\nLED Tube Light,LED Lighting,1,false\r\nGang Switch,Switch & Socket,0,false\r\n"}
          />
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm bg-background">
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
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead className="text-right w-[220px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <p className="text-sm font-medium">Loading subcategories...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <p className="text-sm text-destructive font-medium">Could not load subcategories at this time.</p>
                      <Button variant="outline" size="xs" onClick={handleRefresh} className="gap-1.5">
                        <RefreshCcw className="w-3.5 h-3.5" />
                        Retry
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : subcategories.length > 0 ? (
                <SortableContext
                  items={subcategories.map((c) => c._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {subcategories.map((sub: any, index: number) => {
                    const isSubActive = sub.isActive !== false;
                    return (
                      <SortableTableRow
                        key={sub._id}
                        id={sub._id}
                        disabled={isSearching}
                        className={!isSubActive ? "opacity-60 bg-muted/20" : ""}
                      >
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell>
                          <Avatar className="rounded size-8">
                            <AvatarImage
                              className="rounded"
                              src={
                                sub.image
                                  ? `${import.meta.env.VITE_API_URL}${sub.image}`
                                  : undefined
                              }
                              alt={sub.name}
                            />
                            <AvatarFallback className="rounded">
                              <Image className="size-6 text-muted-foreground" />
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{sub.name}</span>
                            {!isSubActive && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">
                                Hidden
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{sub.slug}</TableCell>
                        <TableCell>{sub.parent?.name || "—"}</TableCell>

                        <TableCell className="text-right">
                          <div className="inline-flex items-center justify-end gap-3">
                            <div className="flex items-center gap-1.5 mr-1" title={isSubActive ? "Visible in store" : "Hidden from store"}>
                              <Switch
                                checked={isSubActive}
                                onCheckedChange={() => handleToggleStatus(sub)}
                              />
                            </div>
                            <CategoryForm
                              category={sub}
                              triggerText="Edit"
                              onSuccess={refetch}
                            />
                            <Button
                              variant="destructive"
                              size="xs"
                              onClick={() => handleDelete(sub)}
                              title="Delete Subcategory"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </SortableTableRow>
                    );
                  })}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    <p className="text-sm font-medium">No subcategories found.</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Click "+ Add Subcategory" or "Import" to get started.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  );
}
