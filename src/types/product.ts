// frontend/src/types/product.ts
export interface IProduct {
  _id?: string; // Use string in frontend
  name: string;
  price: number;
  slug?: string;
  image?: string;
  category_id: string; // string instead of ObjectId
  subcategories?: string[]; // array of category _id strings
  createdAt?: string; // ISO string
  updatedAt?: string;
  meta?: Record<string, any>;
  quantity: number
}
