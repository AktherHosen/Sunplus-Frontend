// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { loginUser, logoutUser, refreshAccessToken, resetPassword } from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

interface IUser {
  _id: string;
  name: string;
  email: string;
  // add more if needed
}

interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (oldPassword: string, newPassword: string) => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser({ email, password });
      setUser(res.data.data.user);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const refreshToken = async () => {
    try {
      const res = await refreshAccessToken();
      // accessToken is set in cookie by backend
      // optionally you can store it in state if needed
    } catch (err: any) {
      setUser(null);
    }
  };

  const resetPasswordHandler = async (oldPassword: string, newPassword: string) => {
    try {
      await resetPassword({ oldPassword, newPassword });
      toast.success("Password updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Password reset failed");
      throw err;
    }
  };

  useEffect(() => {
  const loadUser = async () => {
    try {
      const res = await axios.get("/api/v1/auth/me", { withCredentials: true });
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  loadUser();
}, []);


  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshToken, resetPassword: resetPasswordHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
