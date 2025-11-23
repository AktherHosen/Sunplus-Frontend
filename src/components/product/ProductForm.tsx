import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

interface MetaField {
  key: string;
  value: string;
}

interface ProductFormProps {
  editingProduct: any;
  categories: any[];
  onSave: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

export const ProductForm = ({
  editingProduct,
  categories,
  onSave,
  onCancel,
}: ProductFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [metaFields, setMetaFields] = useState<MetaField[]>([
    { key: "", value: "" },
  ]);
  const [saving, setSaving] = useState(false);

  // Load form when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setDescription(editingProduct.description || "");
      setPrice(editingProduct.price || 0);
      setQuantity(editingProduct.quantity || 0);
      setCategory(editingProduct.category_id?._id || null);

      // Parse subcategory
      if (Array.isArray(editingProduct.subcategories)) {
        setSubcategory(editingProduct.subcategories?.[0]?._id || "");
      } else if (typeof editingProduct.subcategories === "string") {
        setSubcategory(editingProduct.subcategories);
      } else if (editingProduct.subcategories?._id) {
        setSubcategory(editingProduct.subcategories._id);
      } else {
        setSubcategory("");
      }

      setImageFile(null);
      setImagePreview(
        editingProduct.image
          ? `${import.meta.env.VITE_API_URL}${editingProduct.image}`
          : null
      );

      if (editingProduct.meta && typeof editingProduct.meta === "object") {
        const metaArray = Object.entries(editingProduct.meta).map(
          ([key, value]) => ({ key, value: String(value) })
        );
        setMetaFields(metaArray.length ? metaArray : [{ key: "", value: "" }]);
      } else {
        setMetaFields([{ key: "", value: "" }]);
      }
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setQuantity(0);
    setCategory(null);
    setSubcategory(null);
    setImageFile(null);
    setImagePreview(null);
    setMetaFields([{ key: "", value: "" }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
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

  const handleAddMetaField = () =>
    setMetaFields([...metaFields, { key: "", value: "" }]);

  const handleRemoveMetaField = (index: number) =>
    setMetaFields(metaFields.filter((_, i) => i !== index));

  const handleMetaChange = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    const updated = [...metaFields];
    updated[index][field] = newValue;
    setMetaFields(updated);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !price || !category) {
      return;
    }

    const metaObject = metaFields.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value.trim();
      return acc;
    }, {} as Record<string, any>);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("category_id", category);
    if (subcategory) formData.append("subcategories", subcategory);
    if (imageFile) formData.append("image", imageFile);
    formData.append("meta", JSON.stringify(metaObject));

    try {
      setSaving(true);
      await onSave(formData);
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Basic Information Card */}
      <Card className="border-none shadow-none py-0">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., iPhone 15 Pro Max"
                className="h-11"
              />
            </div>

            {/* Description */}
            <div className="space-y-2 row-span-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description..."
                className="h-fit min-h-[125px] resize-none"
              />
            </div>

            <div className="space-y-2">
              {/* Price */}
              <Label htmlFor="price" className="text-sm font-medium">
                Price (৳) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="0.00"
                className="h-11"
                min="0"
                step="0.01"
              />
              {/* Quantity */}
              <Label htmlFor="quantity" className="text-sm font-medium">
                Stock Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="0"
                className="h-11"
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {/* Image Upload Card */}
        <Card className="border-none shadow-none py-0">
          <CardContent className="p-0">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Product Image</Label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Image Preview */}
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
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
        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select onValueChange={setCategory} value={category || ""}>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="w-[var(--radix-select-trigger-width)]"
            >
              {categories.map((cat: any) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Subcategory */}
          <Label className="text-sm font-medium">Subcategory</Label>
          <Select
            onValueChange={setSubcategory}
            value={subcategory || ""}
            disabled={!category}
          >
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select subcategory (optional)" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="w-[var(--radix-select-trigger-width)]"
            >
              {categories
                ?.find((c: any) => c._id === category)
                ?.subcategories?.map((sub: any) => (
                  <SelectItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Meta Fields Card */}
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Additional Attributes
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMetaField}
                className="h-9"
              >
                + Add Field
              </Button>
            </div>

            <div className="space-y-3">
              {metaFields.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-3 p-3 rounded-lg border bg-muted/30"
                >
                  <Input
                    placeholder="Attribute name (e.g., Brand)"
                    value={field.key}
                    onChange={(e) =>
                      handleMetaChange(index, "key", e.target.value)
                    }
                    className="h-10"
                  />
                  <Input
                    placeholder="Value (e.g., Apple)"
                    value={field.value}
                    onChange={(e) =>
                      handleMetaChange(index, "value", e.target.value)
                    }
                    className="h-10"
                  />
                  {metaFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleRemoveMetaField(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="sm:w-auto h-11 px-8"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="sm:w-auto h-11 px-8"
          onClick={handleSubmit}
          disabled={saving || !name.trim() || !price || !category}
        >
          {saving ? (
            <>
              <span className="animate-pulse">Saving...</span>
            </>
          ) : editingProduct ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </div>
  );
};
