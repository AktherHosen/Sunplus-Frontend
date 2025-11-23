import type { IProduct } from "./product";

export type ObjectId = string;

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrder {
  _id: string;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  orderNote: string;
  variant?: string;
  item: IProduct;
  status?: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IOrder | IOrder[];
}
