/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryForm from "@/components/categories/CategoryForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/api/baseApi";
import { toast } from "sonner";

export default function Categories() {
  const { data, isLoading, isError, refetch } =
    useGetAllCategoriesQuery(undefined);
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
            refetch(); // refresh categories
          } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete category");
            console.error(error);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss(); // close the warning toast
          console.log("Deletion cancelled");
        },
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryForm triggerText="+ Add Category" onSuccess={refetch} />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          Loading...........
        </div>
      )}

      {/* Error State */}
      {isError && (
        <p className="text-red-500 text-center">Failed to load categories.</p>
      )}

      {/* Categories Grid */}
      {!isLoading && categories.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <Card
              key={cat._id}
              className="overflow-hidden hover:shadow-lg transition"
            >
              <CardHeader className="p-0 relative">
                <img
                  src={
                    cat.image
                      ? `${import.meta.env.VITE_API_URL}${cat.image}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={cat.name}
                  className="w-full h-40 object-cover"
                />
              </CardHeader>
              <CardContent className="p-3 space-y-2">
                <CardTitle className="text-center text-lg">
                  {cat.name}
                </CardTitle>
                <div className="flex justify-between">
                  {/* Edit button opens the same dialog */}
                  <CategoryForm
                    category={cat}
                    triggerText="Edit"
                    onSuccess={refetch}
                  />
                  {/* Delete button */}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(cat._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && categories.length === 0 && (
        <p className="text-center text-gray-500">No categories found.</p>
      )}
    </div>
  );
}
