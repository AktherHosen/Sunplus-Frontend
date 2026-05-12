import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import type { IProduct } from "@/types/product";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useGetAllProductsQuery();

  const products = useMemo(() => data?.data || [], [data?.data]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product: IProduct) =>
      product.name?.toLowerCase().includes(query),
    );
  }, [searchQuery, products]);

  const handleProductClick = (product: IProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const categorySlug = product.category_id?.slug;
    // Use "unknown" as fallback if subcategory is missing
    const subcategorySlug = product.subcategories?.slug || "unknown";
    const productSlug = product.slug;

    // Only require category and product slug, subcategory can be "unknown"
    if (categorySlug && productSlug) {
      const targetPath = `/product/${categorySlug}/${subcategorySlug}/${productSlug}`;

      // Close popover and clear search
      setIsOpen(false);
      setSearchQuery("");
      inputRef.current?.blur();

      // Navigate immediately
      navigate(targetPath);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  // Helper function to get display price for a product
  // const getDisplayPrice = (product: IProduct): number | null => {
  //   // If product has variants, use variant prices
  //   if (product.variants && product.variants.length > 0) {
  //     const variantPrices = product.variants
  //       .map((v) => v.price)
  //       .filter((price) => price > 0);

  //     if (variantPrices.length > 0) {
  //       // Return the minimum variant price
  //       return Math.min(...variantPrices);
  //     }
  //   }

  //   // Fall back to base price if it exists and is greater than 0
  //   if (product.price && product.price > 0) {
  //     return product.price;
  //   }

  //   return null;
  // };

  useEffect(() => {
    if (searchQuery.trim()) {
      if (filteredProducts.length > 0) {
        setIsOpen(true);
      } else {
        // Keep open even if no results to show "No products found"
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  }, [searchQuery, filteredProducts.length]);

  return (
    <div className="relative flex items-center justify-center w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center w-full">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) {
                    setIsOpen(true);
                  }
                }}
                className="pl-7 sm:pl-9 pr-7 sm:pr-9 w-full h-8 sm:h-9 text-sm sm:text-base"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClear();
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 0);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 hover:bg-transparent"
                  aria-label="Clear search"
                  type="button"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] max-w-md sm:max-w-lg p-0"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            // Keep focus on input
            inputRef.current?.focus();
          }}
          onInteractOutside={(e) => {
            // Prevent closing when clicking on the input or inside popover content
            const target = e.target as HTMLElement;
            const popoverContent = target.closest(
              "[data-radix-popover-content]",
            );

            // Don't close if clicking inside popover content (product items)
            if (popoverContent) {
              e.preventDefault();
              return;
            }

            // Don't close if clicking on the input
            if (
              inputRef.current?.contains(target) ||
              target === inputRef.current
            ) {
              e.preventDefault();
            }
          }}
        >
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              Loading...
            </div>
          ) : filteredProducts.length === 0 && searchQuery.trim() ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No products found
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto">
              {filteredProducts.map((product: IProduct) => (
                <button
                  key={product._id}
                  onClick={(e) => handleProductClick(product, e)}
                  onMouseDown={(e) => {
                    // Prevent input from losing focus
                    e.preventDefault();
                  }}
                  className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-accent transition-colors text-left border-b border-border last:border-b-0 cursor-pointer"
                  type="button"
                >
                  {/* Product Image - Left Side */}
                  <div className="flex-shrink-0">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 rounded-md overflow-hidden border border-border">
                      <AvatarImage
                        src={
                          product.image
                            ? `${import.meta.env.VITE_API_URL}${product.image}`
                            : undefined
                        }
                        alt={product.name || "Product image"}
                        className="object-cover w-full h-full"
                      />
                    </Avatar>
                  </div>
                  {/* Product Info - Right Side */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    {/* {(() => {
                      const displayPrice = getDisplayPrice(product);
                      const hasVariants =
                        product.variants && product.variants.length > 0;

                      if (displayPrice !== null) {
                        if (
                          hasVariants &&
                          product.variants &&
                          product.variants.length > 1
                        ) {
                          // Show price range if multiple variants
                          const prices = product.variants
                            .map((v) => v.price)
                            .filter((price) => price > 0);
                          const minPrice = Math.min(...prices);
                          const maxPrice = Math.max(...prices);

                          if (minPrice === maxPrice) {
                            return (
                              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                                ৳{minPrice.toLocaleString()}
                              </p>
                            );
                          } else {
                            return (
                              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                                ৳{minPrice.toLocaleString()} - ৳
                                {maxPrice.toLocaleString()}
                              </p>
                            );
                          }
                        } else {
                          // Single price
                          return (
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                              ৳{displayPrice.toLocaleString()}
                            </p>
                          );
                        }
                      }
                      return null;
                    })()} */}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground text-center">
              Start typing to search products...
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
