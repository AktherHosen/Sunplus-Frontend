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
  const [descriptions, setDescriptions] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);

  // Three images
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile2, setImageFile2] = useState<File | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(null);
  const [imageFile3, setImageFile3] = useState<File | null>(null);
  const [imagePreview3, setImagePreview3] = useState<string | null>(null);

  // Meta fields
  const [metaFields, setMetaFields] = useState<MetaField[]>([
    { key: "", value: "" },
  ]);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setDescriptions(editingProduct.descriptions || "");
      setPrice(editingProduct.price || 0);
      setQuantity(editingProduct.quantity || 0);
      setCategory(editingProduct.category_id?._id || null);

      if (Array.isArray(editingProduct.subcategories)) {
        setSubcategory(editingProduct.subcategories?.[0]?._id || "");
      } else if (typeof editingProduct.subcategories === "string") {
        setSubcategory(editingProduct.subcategories);
      } else if (editingProduct.subcategories?._id) {
        setSubcategory(editingProduct.subcategories._id);
      } else {
        setSubcategory("");
      }

      const api = import.meta.env.VITE_API_URL;
      setImagePreview(editingProduct.image ? api + editingProduct.image : null);
      setImagePreview2(
        editingProduct.image2 ? api + editingProduct.image2 : null
      );
      setImagePreview3(
        editingProduct.image3 ? api + editingProduct.image3 : null
      );

      setImageFile(null);
      setImageFile2(null);
      setImageFile3(null);

      // Load meta fields
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
    setDescriptions("");
    setPrice(0);
    setQuantity(0);
    setCategory(null);
    setSubcategory(null);

    setImageFile(null);
    setImagePreview(null);

    setImageFile2(null);
    setImagePreview2(null);

    setImageFile3(null);
    setImagePreview3(null);

    setMetaFields([{ key: "", value: "" }]);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setterFile: (f: File | null) => void,
    setterPreview: (s: string | null) => void
  ) => {
    const f = e.target.files?.[0];
    if (f) {
      setterFile(f);
      const reader = new FileReader();
      reader.onloadend = () => setterPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleRemoveImage = (
    setterFile: (f: File | null) => void,
    setterPreview: (s: string | null) => void
  ) => {
    setterFile(null);
    setterPreview(null);
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
    if (!name.trim() || !price || !category) return;

    const metaObject = metaFields.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value.trim();
      return acc;
    }, {} as Record<string, any>);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("descriptions", descriptions);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("category_id", category);
    if (subcategory) formData.append("subcategories", subcategory);

    if (imageFile) formData.append("image", imageFile);
    if (imageFile2) formData.append("image2", imageFile2);
    if (imageFile3) formData.append("image3", imageFile3);

    formData.append("meta", JSON.stringify(metaObject));

    try {
      setSaving(true);
      await onSave(formData);
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const renderImageUpload = (
    preview: string | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    remove: () => void,
    label: string
  ) => (
    <Card className="border-none shadow-none py-0">
      <CardContent className="p-0">
        <div className="space-y-3">
          <Label className="text-sm font-medium">{label}</Label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {preview ? (
              <div className="relative group">
                <img
                  src={preview}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100"
                  onClick={remove}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
            )}

            <div className="flex-1 space-y-2">
              <Label className="flex items-center justify-center gap-2 h-11 px-4 rounded-md border-2 border-dashed bg-muted/50 hover:bg-muted cursor-pointer">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {preview ? "Change Image" : "Upload Image"}
                </span>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onChange}
                />
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Basic Inputs */}
      <Card className="border-none shadow-none py-0">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label>Product Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="iPhone 15 Pro Max"
              />
            </div>

            <div className="space-y-2 row-span-2">
              <Label>Description</Label>
              <Textarea
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Price *</Label>
              <Input
                type="number"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <Label>Quantity</Label>
              <Input
                type="number"
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Image Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderImageUpload(
          imagePreview,
          (e) => handleImageChange(e, setImageFile, setImagePreview),
          () => handleRemoveImage(setImageFile, setImagePreview),
          "Product Image 1"
        )}
        {renderImageUpload(
          imagePreview2,
          (e) => handleImageChange(e, setImageFile2, setImagePreview2),
          () => handleRemoveImage(setImageFile2, setImagePreview2),
          "Product Image 2"
        )}
        {renderImageUpload(
          imagePreview3,
          (e) => handleImageChange(e, setImageFile3, setImagePreview3),
          () => handleRemoveImage(setImageFile3, setImagePreview3),
          "Product Image 3"
        )}
      </div>

      {/* Category & Subcategory */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category *</Label>
          <Select onValueChange={setCategory} value={category || ""}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Subcategory</Label>
          <Select
            onValueChange={setSubcategory}
            value={subcategory || ""}
            disabled={!category}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {categories
                ?.find((c) => c._id === category)
                ?.subcategories?.map((sub: any) => (
                  <SelectItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Meta Fields */}
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Additional Attributes</Label>
              <Button variant="outline" size="sm" onClick={handleAddMetaField}>
                + Add Field
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>Useful meta fields:</span>
                <span className="px-2 py-1 rounded bg-muted">
                  specification
                </span>
                <span className="px-2 py-1 rounded bg-muted">features</span>
                <span className="px-2 py-1 rounded bg-muted">voltage</span>
                <span className="px-2 py-1 rounded bg-muted">current</span>
                <span className="px-2 py-1 rounded bg-muted">new_arrival</span>
                <span className="px-2 py-1 rounded bg-muted">size</span>
                <span className="px-2 py-1 rounded bg-muted">color</span>
              </div>
              {metaFields.map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-3 p-3 rounded-lg border bg-muted/30"
                >
                  <Input
                    placeholder="Attribute ()"
                    value={f.key}
                    onChange={(e) => handleMetaChange(i, "key", e.target.value)}
                  />
                  <Input
                    placeholder="Value (Apple)"
                    value={f.value}
                    onChange={(e) =>
                      handleMetaChange(i, "value", e.target.value)
                    }
                  />
                  {metaFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveMetaField(i)}
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
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={saving || !name.trim() || !price || !category}
        >
          {saving
            ? "Saving..."
            : editingProduct
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </div>
  );
};
