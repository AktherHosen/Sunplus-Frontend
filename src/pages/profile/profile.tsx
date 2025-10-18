import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useUpdateUserMutation } from "@/redux/api/baseApi";
import { Check, Edit, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [formState, setFormState] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateUser({ id: user._id, payload: formState }).unwrap();
      toast.success("Profile updated successfully");
      setFormState((prev) => ({ ...prev, password: "" }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md rounded-lg shadow-none border border-border">
        <CardContent className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative group mb-4">
            <Avatar className="size-25 rounded-full">
              <AvatarImage src={user?.avatar || ""} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 p-1 rounded-full border border-border"
            >
              <Edit className="w-4 h-4 text-foreground" />
            </Button>
          </div>

          <h2 className="text-2xl font-semibold text-foreground">
            {user?.name}
          </h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>

          {/* Form */}
          <div className="mt-6 w-full space-y-4">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            <Button
              className="mt-4 w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
