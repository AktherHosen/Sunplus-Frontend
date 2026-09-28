/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CategoryForm from "@/components/categories/CategoryForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  useGetAllCategoriesQuery,
  useReorderCategoriesMutation,
} from "@/redux/api/baseApi";
import { Image, Trash, GripVertical } from "lucide-react";
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

export default function Categories() {
  const { data, isLoading, isError, refetch } =
    useGetAllCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [reorderCategories] = useReorderCategoriesMutation();

  const [categories, setCategories] = useState<any[]>([]);

  // Update local state when API data changes
  useEffect(() => {
    if (data?.data) {
      setCategories(data.data);
    }
  }, [data]);

  // Setup Drag and Drop Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((item) => item._id === active.id);
      const newIndex = categories.findIndex((item) => item._id === over.id);

      const newItems = arrayMove(categories, oldIndex, newIndex);
      setCategories(newItems); // Optimistic UI update

      // Save to backend
      const updates = newItems.map((item, index) => ({
        id: item._id,
        order: index,
      }));

      try {
        await reorderCategories(updates).unwrap();
        toast.success("Categories reordered successfully!");
      } catch (error: any) {
        toast.error("Failed to reorder categories");
        refetch(); // Revert to original order if API fails
      }
    }
  };

  const handleDelete = (id: string) => {
    toast.warning("Are you sure you want to delete this category?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteCategory(id).unwrap();
            toast.success("Category deleted successfully!");
            refetch();
          } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete category");
            console.error(error);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <div className="p-6 space-y-6 container mx-auto px-4 lg:px-0 lg:py-2.5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryForm triggerText="+ Add Category" onSuccess={refetch} />
      </div>

      {/* Loading */}
      {isLoading && <p className="text-center">Loading categories...</p>}

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-center">Failed to load categories.</p>
      )}

      {/* Table View */}
      {!isLoading && categories.length > 0 && (
        <div className="overflow-x-auto border rounded-lg bg-background">
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
                  <TableHead className="text-center w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext
                  items={categories.map((c) => c._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {categories.map((cat: any, index: number) => (
                    <SortableTableRow key={cat._id} id={cat._id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>
                        <Avatar className="rounded size-8">
                          <AvatarImage
                            className="rounded"
                            src={
                              cat.image
                                ? `${import.meta.env.VITE_API_URL}${cat.image}`
                                : undefined
                            }
                            alt={cat.name}
                          />
                          <AvatarFallback className="rounded">
                            <Image className="size-6 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{cat.name}</TableCell>

                      <TableCell className="text-center space-x-2">
                        <CategoryForm
                          category={cat}
                          triggerText="Edit"
                          onSuccess={refetch}
                        />
                        <Button
                          variant="destructive"
                          size="xs"
                          onClick={() => handleDelete(cat._id)}
                        >
                          <Trash />
                        </Button>
                      </TableCell>
                    </SortableTableRow>
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && categories.length === 0 && (
        <p className="text-center text-gray-500">No categories found.</p>
      )}
    </div>
  );
}
