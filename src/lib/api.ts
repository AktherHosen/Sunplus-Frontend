// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1/auth",
  withCredentials: true, // important for cookies
});

export const loginUser = (payload: { email: string; password: string }) =>
  api.post("/login", payload);

export const refreshAccessToken = () => api.post("/refresh-token");

export const logoutUser = () => api.post("/logout");

export const resetPassword = (payload: {
  oldPassword: string;
  newPassword: string;
}) => api.post("/reset-password", payload);
