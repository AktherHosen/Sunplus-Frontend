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
import {
  ImageIcon,
  Plus,
  Upload,
  X,
  Layers,
  Tag,
  DollarSign,
  Boxes,
  Hash,
  Sparkles,
  Copy,
} from "lucide-react";
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
  const [price, setPrice] = useState<number | string>("");
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
      setPrice(editingProduct.price ?? "");
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
    setPrice("");
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

  const handleApplySuggestedMeta = (tag: string) => {
    // If there is an empty key field, fill it
    const emptyIndex = metaFields.findIndex((f) => !f.key.trim());
    if (emptyIndex !== -1) {
      const updated = [...metaFields];
      updated[emptyIndex].key = tag;
      setMetaFields(updated);
    } else {
      // Otherwise append a new one
      setMetaFields([...metaFields, { key: tag, value: "" }]);
    }
  };

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
      { name: "", price: "", quantity: 0, sku: "", attributes: {} } as any,
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

    // Price is optional, so we don't return early if it's empty
    if (
      useVariants &&
      (!variants.length || variants.some((v) => !v.name))
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
      if (price !== "") formData.append("price", price.toString());
      formData.append("quantity", quantity.toString());
    }

    formData.append("category_id", category);
    if (subcategory) formData.append("subcategories", subcategory);

    if (imageFile) formData.append("image", imageFile);
    else if (editingProduct?.image && imagePreview) formData.append("existingImage", editingProduct.image);
    
    if (imageFile2) formData.append("image2", imageFile2);
    else if (editingProduct?.image2 && imagePreview2) formData.append("existingImage2", editingProduct.image2);

    if (imageFile3) formData.append("image3", imageFile3);
    else if (editingProduct?.image3 && imagePreview3) formData.append("existingImage3", editingProduct.image3);

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
      <Card className="border border-border/80 shadow-none bg-card overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Header toggle for variants */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/60 bg-gradient-to-r from-muted/30 to-muted/10 gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-0.5 sm:mt-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="useVariants"
                      className="text-base font-semibold cursor-pointer text-foreground"
                    >
                      Product Variants
                    </Label>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-muted text-muted-foreground border">
                      Multiple Options & Pricing
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Enable if this product comes in multiple sizes, colors, wattages, or SKUs.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <input
                  type="checkbox"
                  id="useVariants"
                  checked={useVariants}
                  onChange={(e) => {
                    setUseVariants(e.target.checked);
                    if (e.target.checked) {
                      setPrice(0);
                      if (variants.length === 0) {
                        handleAddVariant();
                      }
                    }
                  }}
                  className="h-5 w-5 rounded border-border/60 text-primary focus:ring-2 focus:ring-primary/30 cursor-pointer accent-primary transition-all"
                />
              </div>
            </div>

            {useVariants ? (
              <div className="space-y-4">
                {/* Variant actions toolbar */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-1">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      Configured Variants
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                        {variants.length}
                      </span>
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Each variant has its own price, stock, and SKU.
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddVariant}
                    className="gap-1.5 shadow-sm h-9"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Variant</span>
                  </Button>
                </div>

                {variants.length === 0 ? (
                  <div className="text-sm p-8 border-2 border-dashed border-border/60 rounded-xl text-center bg-muted/5 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mb-3 text-muted-foreground">
                      <Boxes className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-foreground">No variants added yet</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                      Create variations like "12W - Warm White", "18W - Daylight", or different sizes with custom prices.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddVariant}
                      className="mt-4 gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add First Variant
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div
                        key={index}
                        className="group relative rounded-xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-xs transition-all duration-200 overflow-hidden"
                      >
                        {/* Variant Card Header */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/20 border-b border-border/40">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold">
                              #{index + 1}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                              {variant.name || "Untitled Variant"}
                            </span>
                            {Number(variant.price) > 0 && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                Tk. {Number(variant.price).toLocaleString()}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Duplicate variant button */}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              title="Duplicate variant"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              onClick={() => {
                                const dup = { ...variant, name: `${variant.name} (Copy)` };
                                setVariants([...variants, dup]);
                              }}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                            {/* Remove button */}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                              onClick={() => handleRemoveVariant(index)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Variant Inputs Grid */}
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                          {/* Name Input */}
                          <div className="space-y-1.5 lg:col-span-2">
                            <Label className="text-xs font-medium text-foreground/80 flex items-center gap-1">
                              <Tag className="w-3 h-3 text-muted-foreground" />
                              Variant Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              placeholder="e.g. 18W Daylight / Large Red"
                              value={variant.name}
                              onChange={(e) =>
                                handleVariantChange(index, "name", e.target.value)
                              }
                              className="h-9.5 text-sm border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40"
                            />
                          </div>

                          {/* Price Input */}
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground/80 flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-muted-foreground" />
                              Price (Tk.)
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
                              className="h-9.5 text-sm border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 font-medium"
                            />
                          </div>

                          {/* Quantity Input */}
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground/80 flex items-center gap-1">
                              <Boxes className="w-3 h-3 text-muted-foreground" />
                              Stock Quantity
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
                              className="h-9.5 text-sm border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40"
                            />
                          </div>

                          {/* SKU Input */}
                          <div className="space-y-1.5 lg:col-span-4">
                            <Label className="text-xs font-medium text-foreground/80 flex items-center gap-1">
                              <Hash className="w-3 h-3 text-muted-foreground" />
                              SKU / Model Number (Optional)
                            </Label>
                            <Input
                              placeholder="e.g. LED-18W-DL-001"
                              value={variant.sku || ""}
                              onChange={(e) =>
                                handleVariantChange(index, "sku", e.target.value)
                              }
                              className="h-9 text-xs border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded-xl border border-border/40 bg-muted/5">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-sm font-medium text-foreground/90 flex items-center gap-1.5"
                  >
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    Base Price (Tk.)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price || ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="0.00"
                    className="h-11 border-border/60 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="quantity"
                    className="text-sm font-medium text-foreground/90 flex items-center gap-1.5"
                  >
                    <Boxes className="w-4 h-4 text-muted-foreground" />
                    Available Quantity
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
              <div>
                <Label className="text-sm font-semibold text-foreground">
                  Additional Specifications & Attributes
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any suggested attribute below to add it instantly.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddMetaField}
                className="gap-2 border-border/60 hover:bg-muted/30 transition-colors h-9"
              >
                <Plus className="w-4 h-4" />
                Add Field
              </Button>
            </div>

            {/* Clickable suggested attribute tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
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
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleApplySuggestedMeta(tag)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
                >
                  <Plus className="w-3 h-3 opacity-70" />
                  {tag}
                </button>
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
            (useVariants &&
              (!variants.length || variants.some((v) => !v.name)))
          }
          className="min-w-[140px] shadow-sm hover:shadow transition-all"
        >
          {saving
            ? "Saving..."
            : editingProduct && !editingProduct.isDuplicate
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </div>
  );
};
