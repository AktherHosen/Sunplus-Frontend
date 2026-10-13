import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { useUpdateUserMutation } from "@/redux/api/baseApi";
import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Mail,
  Shield,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
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

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      if (!user) {
        return;
      }
      if (!formState.name.trim()) {
        toast.error("Name cannot be empty");
        return;
      }
      if (!formState.email.trim()) {
        toast.error("Email cannot be empty");
        return;
      }

      await updateUser({ id: user._id, payload: formState }).unwrap();
      toast.success("Profile updated successfully");
      setFormState((prev) => ({ ...prev, password: "" }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - Consistent with Products, Categories, Users pages */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight">Account Profile</h1>
            <Badge
              variant="outline"
              className="text-xs bg-primary/10 text-primary border-primary/20 capitalize font-medium flex items-center gap-1"
            >
              <ShieldCheck className="h-3 w-3" />
              {user?.role || "ADMIN"}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage your personal profile, credentials, and password settings.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Profile Card, Right Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Profile Card */}
        <div className="md:col-span-4 space-y-6">
          <Card className="rounded-lg border bg-background shadow-none">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3">
                <Avatar className="h-20 w-20 border-2 border-border shadow-xs">
                  <AvatarImage src="" alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl uppercase">
                    {user?.name ? user.name.slice(0, 2) : "AD"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight">
                {user?.name || "Sunplus User"}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {user?.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="flex justify-center gap-2">
                <Badge variant="secondary" className="text-xs font-normal capitalize">
                  {user?.role || "ADMIN"}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs font-normal text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
                >
                  Active
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <UserIcon className="h-3.5 w-3.5" /> Full Name
                  </span>
                  <span className="font-medium text-foreground">{user?.name || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </span>
                  <span className="font-medium text-foreground truncate max-w-[150px]">
                    {user?.email || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" /> Role Level
                  </span>
                  <span className="font-medium text-foreground capitalize">
                    {user?.role || "Admin"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Form Settings */}
        <div className="md:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="rounded-lg border bg-background shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-xs">
                  Update your account display name and registered email address.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium">
                    Display Name
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="pl-9 h-9 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="name@sunplus.com"
                      className="pl-9 h-9 text-sm"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-lg border bg-background shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">
                  Security & Password
                </CardTitle>
                <CardDescription className="text-xs">
                  Leave blank if you do not want to change your password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium">
                    New Password
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formState.password}
                      onChange={handleChange}
                      placeholder="Enter new password (optional)"
                      className="pl-9 pr-10 h-9 text-sm"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-3.5 flex items-center justify-end">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading}
                  className="gap-1.5 shadow-xs"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
