export interface IUser {
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
