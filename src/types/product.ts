export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  banners: string[];
  parent?: string | null;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
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
