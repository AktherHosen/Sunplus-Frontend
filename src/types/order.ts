import type { IProduct } from "./product";

export type ObjectId = string;

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface IOrder {
  _id: string;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  item: IProduct;
  status?: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
}
