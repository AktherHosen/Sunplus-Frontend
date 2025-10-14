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
} from "@/redux/api/categoriesApi";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: any; // Edit mode
  triggerText?: string;
  onSuccess?: () => void;
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
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);
  const [bannerPreviews, setBannerPreviews] = useState<string[]>([]);
  const [parent, setParent] = useState<string | null>(null);

  const isEditMode = Boolean(category);

  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setName(category.name || "");

      // FIX: parent._id if parent exists
      setParent(category.parent?._id || null);

      setImagePreview(
        category.image
          ? `${import.meta.env.VITE_API_URL}${category.image}`
          : null
      );
      setImageFile(null);
      setBannerPreviews(
        category.banners?.map(
          (b: string) => `${import.meta.env.VITE_API_URL}${b}`
        ) || []
      );
      setBannerFiles([]);
    } else {
      setName("");
      setParent(null);
      setImageFile(null);
      setImagePreview(null);
      setBannerFiles([]);
      setBannerPreviews([]);
    }
  }, [category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setBannerFiles(files);
    setBannerPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent", parent || "");

      if (imageFile) formData.append("image", imageFile);
      bannerFiles.forEach((file) => formData.append("banners", file));

      if (isEditMode && category.slug) {
        await updateCategory({ slug: category.slug, formData }).unwrap();
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
        <Button
          variant={isEditMode ? "outline" : "default"}
          size={isEditMode ? "xs" : "sm"}>
          {isEditMode ? (
            <Edit className="w-6 h-6" />
          ) : (
            triggerText || "+ Add Category"
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edit category details and optionally upload new images or banners."
              : "Upload an image, banners, and create a new category or subcategory."}
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

          {/* Main Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Upload Main Image</Label>
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
                className="w-16 h-16 object-cover rounded border"
              />
            )}
          </div>

          {/* Banner Images */}
          <div className="space-y-2">
            <Label htmlFor="banners">Upload Banners (multiple)</Label>
            <Input
              id="banners"
              type="file"
              accept="image/*"
              multiple
              onChange={handleBannerChange}
            />
            <div className="flex space-x-2 mt-2 flex-wrap">
              {bannerPreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Banner ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
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
