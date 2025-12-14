import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Edit, ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: any;
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
  const [newArrival, setNewArrival] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setParent(category.parent?._id || null);
      setImagePreview(
        category.image
          ? `${import.meta.env.VITE_API_URL}${category.image}`
          : null
      );
      setImageFile(null);
      setNewArrival(Boolean(category?.new_arrival));
      setBannerPreviews(
        category.banners?.map(
          (b: string) => `${import.meta.env.VITE_API_URL}${b}`
        ) || []
      );
      setBannerFiles([]);
    } else {
      resetForm();
    }
  }, [category, open]);

  const resetForm = () => {
    setName("");
    setParent(null);
    setImageFile(null);
    setImagePreview(null);
    setBannerFiles([]);
    setBannerPreviews([]);
    setNewArrival(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setBannerFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setBannerPreviews(previews);
  };

  const handleRemoveBanner = (index: number) => {
    setBannerFiles((prev) => prev.filter((_, i) => i !== index));
    setBannerPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent", parent || "");
      formData.append("new_arrival", newArrival ? "true" : "false");

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
      resetForm();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save category");
    }
  };

  const isSaving = isAdding || isUpdating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isEditMode ? "outline" : "default"}
          size={isEditMode ? "xs" : "sm"}
        >
          {isEditMode ? (
            <Edit className="w-4 h-4" />
          ) : (
            triggerText || "+ Add Category"
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditMode ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update category details and manage images"
              : "Create a new category or subcategory with images"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Basic Information Card */}
          <Card className="border-none shadow-none py-0">
            <CardContent className="p-0 space-y-4">
              {/* Category Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Category Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Switches, Sockets, LED Lights"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Main Image Card */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none shadow-none py-0">
              <CardContent className="p-0">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Category Image</Label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {/* Image Preview */}
                    {imagePreview ? (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Category preview"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
                        <ImageIcon className="w-10 h-10 text-muted-foreground" />
                      </div>
                    )}

                    {/* Upload Button */}
                    <div className="flex-1 space-y-2">
                      <Label
                        htmlFor="image"
                        className="flex items-center justify-center gap-2 h-11 px-4 rounded-md border-2 border-dashed border-border bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {imagePreview ? "Change Image" : "Upload Image"}
                        </span>
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or WEBP (Max 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Parent Category */}
            <div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Parent Category</Label>
                <Select onValueChange={setParent} value={parent || ""}>
                  <SelectTrigger className="h-11 w-full">
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
              <div className="space-y-2">
                <Label className="text-sm font-medium">Flags</Label>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="newArrival"
                    checked={newArrival}
                    onChange={(e) => setNewArrival(e.target.checked)}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <Label htmlFor="newArrival" className="cursor-pointer">
                    New Arrival
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Images Card */}
          <Card className="border-none shadow-none py-0">
            <CardContent className="p-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Banner Images (Optional)
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Multiple images not allowed
                  </span>
                </div>

                {/* Upload Area */}
                <Label
                  htmlFor="banners"
                  className="flex flex-col items-center justify-center h-32 rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Click to upload banner images
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Recommended: 1920x400px
                  </span>
                </Label>
                <Input
                  id="banners"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleBannerChange}
                  className="hidden"
                />

                {/* Banner Previews */}
                {bannerPreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {bannerPreviews.map((src, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={src}
                          alt={`Banner ${idx + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveBanner(idx)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSaving}
              className="h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !name.trim()}
              className="h-11 px-8"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>{isEditMode ? "Update Category" : "Create Category"}</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
