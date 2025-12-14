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
import type { ICategory, IProduct, IVariant } from "@/types/product";
import { ImageIcon, Package, Plus, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

interface MetaField {
  key: string;
  value: string;
}

interface ProductFormProps {
  editingProduct: IProduct | null;
  categories: ICategory[];
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

  // Variant management
  const [useVariants, setUseVariants] = useState(false);
  const [variants, setVariants] = useState<IVariant[]>([]);

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

      // Check if product has variants
      if (
        editingProduct.variants &&
        Array.isArray(editingProduct.variants) &&
        editingProduct.variants.length > 0
      ) {
        setUseVariants(true);
        setVariants(editingProduct.variants);
      } else {
        setUseVariants(false);
        setVariants([]);
      }

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
    setUseVariants(false);
    setVariants([]);

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

  // Variant handlers
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { name: "", price: 0, quantity: 0, sku: "", attributes: {} },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: keyof IVariant,
    value: string | number
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !category) return;

    // Validate: either price or variants must be provided
    if (!useVariants && !price) {
      return;
    }
    if (
      useVariants &&
      (!variants.length || variants.some((v) => !v.name || !v.price))
    ) {
      return;
    }

    const metaObject = metaFields.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value.trim();
      return acc;
    }, {} as Record<string, string>);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("descriptions", descriptions);

    if (useVariants) {
      // Send variants as JSON string
      formData.append("variants", JSON.stringify(variants));
      // Calculate total quantity from variants if not set
      const totalQty = variants.reduce((sum, v) => sum + (v.quantity || 0), 0);
      if (totalQty > 0) {
        formData.append("quantity", totalQty.toString());
      }
      // Backend requires price field even when using variants
      // Set to 0 since variants have their own prices
      formData.append("price", "0");
    } else {
      formData.append("price", price.toString());
      formData.append("quantity", quantity.toString());
    }

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
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">{label}</Label>
      <div className="flex items-center gap-3">
        {preview ? (
          <div className="relative group">
            <div className="w-28 h-28 rounded-lg overflow-hidden border border-border/50 bg-muted/30 shadow-sm">
              <img
                src={preview}
                alt={label}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-1.5 -right-1.5 h-7 w-7 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
              onClick={remove}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="w-28 h-28 rounded-lg border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/20 transition-colors">
            <ImageIcon className="w-9 h-9 text-muted-foreground/50" />
          </div>
        )}
        <Label className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-lg border border-dashed border-border/40 bg-muted/10 hover:bg-muted/20 cursor-pointer transition-all duration-200">
          <Upload className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {preview ? "Change" : "Upload"}
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
  );

  return (
    <div className="space-y-6">
      {/* Card 1: Basic Information */}
      <Card className="border border-border/80 shadow-none bg-card">
        <CardContent className="p-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground/90"
              >
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="iPhone 15 Pro Max"
                className="h-11 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-foreground/90"
              >
                Description
              </Label>
              <Textarea
                id="description"
                className="min-h-[130px] resize-none border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
                placeholder="Enter product description..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-foreground/90"
                >
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={setCategory} value={category || ""}>
                  <SelectTrigger
                    id="category"
                    className="h-11 w-full border-border/60 focus:ring-2 focus:ring-primary/30 transition-all"
                  >
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
              <div className="space-y-2">
                <Label
                  htmlFor="subcategory"
                  className="text-sm font-medium text-foreground/90"
                >
                  Subcategory
                </Label>
                <Select
                  onValueChange={setSubcategory}
                  value={subcategory || ""}
                  disabled={!category}
                >
                  <SelectTrigger
                    id="subcategory"
                    className="h-11 w-full border-border/60 focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      ?.find((c) => c._id === category)
                      ?.subcategories?.map((sub: ICategory) => (
                        <SelectItem key={sub._id} value={sub._id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Product Images */}
      <Card className="border border-border/80 shadow-none bg-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        </CardContent>
      </Card>

      {/* Card 3: Pricing & Variants */}
      <Card className="border border-border/80 shadow-none bg-card">
        <CardContent className="p-6">
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border/40 bg-muted/20">
              <input
                type="checkbox"
                id="useVariants"
                checked={useVariants}
                onChange={(e) => {
                  setUseVariants(e.target.checked);
                  if (e.target.checked) {
                    setPrice(0);
                  }
                }}
                className="h-4 w-4 rounded border-border/60 text-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-0 cursor-pointer transition-all"
              />
              <Label
                htmlFor="useVariants"
                className="text-sm font-medium cursor-pointer flex-1 text-foreground/90"
              >
                Use Variants (Multiple Prices)
              </Label>
            </div>

            {useVariants ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-foreground/90">
                    Product Variants <span className="text-destructive">*</span>
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddVariant}
                    className="gap-2 border-border/60 hover:bg-muted/30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Variant
                  </Button>
                </div>
                {variants.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-6 border-2 border-dashed border-border/40 rounded-lg text-center bg-muted/10">
                    <Package className="w-7 h-7 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="font-medium">
                      No variants added. Click "Add Variant" to create one.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <Card
                        key={index}
                        className="border border-border/80 shadow-none bg-card"
                      >
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-border/40">
                              <Label className="text-sm font-medium text-foreground/90">
                                Variant {index + 1}
                              </Label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() => handleRemoveVariant(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-foreground/80">
                                  Name{" "}
                                  <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                  placeholder="e.g., Small - Red"
                                  value={variant.name}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  className="h-10 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-foreground/80">
                                  Price{" "}
                                  <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  value={variant.price || ""}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "price",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="h-10 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-foreground/80">
                                  Quantity
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={variant.quantity || ""}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "quantity",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="h-10 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-foreground/80">
                                  SKU
                                </Label>
                                <Input
                                  placeholder="SKU-001"
                                  value={variant.sku || ""}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "sku",
                                      e.target.value
                                    )
                                  }
                                  className="h-10 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-sm font-medium text-foreground/90"
                  >
                    Price <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price || ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="0.00"
                    className="h-11 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="quantity"
                    className="text-sm font-medium text-foreground/90"
                  >
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity || ""}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="0"
                    className="h-11 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Meta Fields */}
      <Card className="border border-border/80 shadow-none bg-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-foreground/90">
                Additional Attributes
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddMetaField}
                className="gap-2 border-border/60 hover:bg-muted/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Field
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Suggested:
              </span>
              {[
                "specifications",
                "features",
                "voltage",
                "current",
                "new_arrival",
                "size",
                "color",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/8 text-primary border border-primary/15 hover:bg-primary/12 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              {metaFields.map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg border border-border/40 bg-muted/10"
                >
                  <Input
                    placeholder="Attribute like above"
                    value={f.key}
                    onChange={(e) => handleMetaChange(i, "key", e.target.value)}
                    className="h-10 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                  />
                  <Input
                    placeholder="Value with comma separated"
                    value={f.value}
                    onChange={(e) =>
                      handleMetaChange(i, "value", e.target.value)
                    }
                    className="h-10 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                  />
                  {metaFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 shrink-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
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
      <div className="flex justify-end gap-3 pt-5 border-t border-border/40">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={saving}
          className="min-w-[100px] border-border/60 hover:bg-muted/30 transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            saving ||
            !name.trim() ||
            !category ||
            (!useVariants && !price) ||
            (useVariants &&
              (!variants.length || variants.some((v) => !v.name || !v.price)))
          }
          className="min-w-[140px] shadow-sm hover:shadow transition-all"
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
