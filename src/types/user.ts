import type { ObjectId } from "./order";

export interface IUser {
  _id: ObjectId
  name: string;
  email: string;
  picture?: string;
  phone?: string;
  password?: string;
  isActive?: string;
  isDeleted?: string;
  isVerified?: boolean;
  role: "SUPER_ADMIN" | "ADMIN";
}
