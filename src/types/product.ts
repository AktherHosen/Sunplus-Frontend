export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  banners: string[];
  parent?: string | null;
  subcategories?: ICategory[];
}

export interface IVariant {
  _id?: string;
  name: string; // e.g., "Small - Red", "Large - Blue"
  price: number;
  quantity?: number;
  sku?: string;
  attributes?: Record<string, any>; // e.g., { size: "S", color: "Red" }
  image?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  price?: number; // Base price (optional, for backward compatibility)
  variants?: IVariant[]; // Array of variants with different prices
  quantity?: number;
  image?: string;
  image2?: string;
  image3?: string;
  descriptions?: string;
  slug?: string;
  category_id?: ICategory | null;
  subcategories?: ICategory | null;
  meta?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IProduct;
}

export interface SubcategoryProductsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    products: IProduct[];
    subcategory: ICategory;
  };
}
