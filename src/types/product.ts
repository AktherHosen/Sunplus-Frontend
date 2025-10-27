export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  banners?: string[];
  parent?: string | null;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
  image?: string;
  slug?: string;
  category_id?: ICategory | null;
  subcategories?: ICategory | null;
  meta?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}
