export type ObjectId = string;

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface IOrder {
  _id?: ObjectId;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  item: ObjectId;
  status?: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
}
