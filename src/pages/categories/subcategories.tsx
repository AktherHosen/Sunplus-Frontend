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
  useGetAllSubCategoriesQuery,
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

export default function Subcategories() {
  const { data, isLoading, isError, refetch } = useGetAllSubCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [reorderCategories] = useReorderCategoriesMutation();

  const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      setSubcategories(data.data);
    }
  }, [data]);

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subcategories</h1>
        {/* Add Subcategory Button */}
        <CategoryForm triggerText="+ Add Subcategory" onSuccess={refetch} />
      </div>

      {subcategories.length > 0 ? (
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
                  <TableHead className="text-center w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext
                  items={subcategories.map((c) => c._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {subcategories.map((sub: any, index: number) => (
                    <SortableTableRow key={sub._id} id={sub._id}>
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
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell className="text-gray-600">{sub.slug}</TableCell>
                      <TableCell>{sub.parent?.name || "—"}</TableCell>
                      <TableCell className="text-center space-x-2">
                        {/* Edit using CategoryForm */}
                        <CategoryForm
                          category={sub}
                          triggerText="Edit"
                          onSuccess={refetch}
                        />
                        <Button
                          variant="destructive"
                          size="xs"
                          onClick={() => handleDelete(sub)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </SortableTableRow>
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </div>
      ) : (
        <p className="text-center text-gray-500">No subcategories found.</p>
      )}
    </div>
  );
}
