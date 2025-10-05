import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: any; // if passed, component works as edit
  triggerText?: string; // optional trigger button text
  onSuccess?: () => void; // optional callback after save
}

export default function CategoryForm({
  category,
  triggerText,
  onSuccess,
}: CategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [parent, setParent] = useState<string | null>(null);

  const isEditMode = Boolean(category);
  const BASE_URL = "http://localhost:5000";

  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setParent(category.parent || null);
      setImagePreview(category.image ? `${BASE_URL}${category.image}` : null);
      setImageFile(null); // reset file input
    } else {
      setName("");
      setParent(null);
      setImageFile(null);
      setImagePreview(null);
    }
  }, [category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (parent) formData.append("parent", parent);
      if (imageFile) formData.append("image", imageFile);

      if (isEditMode && category._id) {
        await updateCategory({ id: category._id, formData }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await addCategory(formData).unwrap();
        toast.success("Category added successfully!");
      }

      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={isEditMode ? "outline" : "default"}>
          {triggerText || (isEditMode ? "Edit" : "+ Add Category")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edit category details and optionally upload a new image."
              : "Upload an image and create a new category or subcategory."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g., Switches"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>

            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-10 h-10 object-cover mb-2 rounded border"
              />
            )}
          </div>

          {/* Parent Category */}
          <div className="space-y-2">
            <Label>Parent Category (optional)</Label>
            <Select onValueChange={setParent} value={parent || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select parent category (optional)" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data
                  ?.filter((cat: any) => cat._id !== category?._id)
                  .map((cat: any) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isAdding || isUpdating}>
              {isEditMode
                ? isUpdating
                  ? "Updating..."
                  : "Update"
                : isAdding
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
