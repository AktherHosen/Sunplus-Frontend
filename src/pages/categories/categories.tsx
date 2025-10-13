/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryForm from "@/components/categories/CategoryForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/categoriesApi";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export default function Categories() {
  const { data, isLoading, isError, refetch } = useGetAllCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data || [];

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
    <div className="p-6 space-y-6 container mx-auto px-4 lg:px-0 py-2.5">
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
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-center">#</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat: any, index: number) => (
                <TableRow key={cat._id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={
                          cat.image
                            ? `${import.meta.env.VITE_API_URL}${cat.image}`
                            : undefined
                        }
                        alt={cat.name}
                      />
                      <AvatarFallback>{cat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="max-w-[300px] truncate text-gray-600">
                    {cat.description || "—"}
                  </TableCell>
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
                      <Trash/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && categories.length === 0 && (
        <p className="text-center text-gray-500">No categories found.</p>
      )}
    </div>
  );
}
