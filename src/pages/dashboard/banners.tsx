import { useEffect, useState } from "react";
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
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetAllBannersQuery,
  useReorderBannersMutation,
} from "@/redux/api/baseApi";
import { Image, Trash, GripVertical, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";

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

export default function BannersPage() {
  const { data, isLoading, isError, refetch } = useGetAllBannersQuery(undefined);
  const [deleteBanner] = useDeleteBannerMutation();
  const [reorderBanners] = useReorderBannersMutation();
  const [addBanner, { isLoading: isUploading }] = useAddBannerMutation();

  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      setBanners(data.data);
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
      const oldIndex = banners.findIndex((item) => item._id === active.id);
      const newIndex = banners.findIndex((item) => item._id === over.id);

      const newItems = arrayMove(banners, oldIndex, newIndex);
      setBanners(newItems);

      const updates = newItems.map((item, index) => ({
        id: item._id,
        order: index,
      }));

      try {
        await reorderBanners(updates).unwrap();
        toast.success("Banners reordered successfully!");
      } catch (error: any) {
        toast.error("Failed to reorder banners");
        refetch(); // Revert
      }
    }
  };

  const handleDelete = (id: string) => {
    toast.warning("Are you sure you want to delete this banner?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteBanner(id).unwrap();
            toast.success("Banner deleted successfully!");
            refetch();
          } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete banner");
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => toast.dismiss() },
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await addBanner(formData).unwrap();
      toast.success("Banner uploaded successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload banner");
    }
  };

  return (
    <div className="p-6 space-y-6 container mx-auto px-4 lg:px-0 py-2.5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Home Banners</h1>
        <div className="relative">
          <Input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
            disabled={isUploading}
            className="hidden" 
            id="banner-upload"
          />
          <label htmlFor="banner-upload">
            <Button asChild disabled={isUploading}>
              <span>
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                + Upload Banner
              </span>
            </Button>
          </label>
        </div>
      </div>

      {isLoading && <p className="text-center p-4">Loading banners...</p>}
      {isError && <p className="text-center text-red-500">Failed to load banners.</p>}

      {!isLoading && banners.length > 0 && (
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
                  <TableHead>Preview</TableHead>
                  <TableHead className="text-center w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext
                  items={banners.map((b) => b._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {banners.map((banner: any, index: number) => (
                    <SortableTableRow key={banner._id} id={banner._id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>
                        <div className="h-16 w-32 rounded overflow-hidden bg-muted flex items-center justify-center">
                          {banner.image ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${banner.image}`}
                              alt={`Banner ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Image className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button
                          variant="destructive"
                          size="xs"
                          onClick={() => handleDelete(banner._id)}
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
      )}

      {!isLoading && banners.length === 0 && (
        <p className="text-center text-gray-500">No banners found. Upload one to display on the homepage.</p>
      )}
    </div>
  );
}
