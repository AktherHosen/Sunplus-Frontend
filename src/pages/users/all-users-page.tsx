import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/auth-context";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/baseApi";
import { Image, Loader2, Plus, RefreshCcw, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AllUsersPage() {
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery(undefined);
  const { user: currentUser } = useAuth();
  const allUsers = data?.data ?? [];
  const [deleteUser] = useDeleteUserMutation();
  // Create user state
  const [addUser] = useAddUserMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"SUPER_ADMIN" | "ADMIN">("ADMIN");
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch(); // refetch returns a promise
    } finally {
      setRefreshing(false);
    }
  };
  // Loading and error
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin text-primary w-6 h-6 mr-2" />
        <span>Loading users...</span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load users.{" "}
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );

  const handleDelete = async (userId: string, userRole: string) => {
    if (userRole === "SUPER_ADMIN")
      return toast.warning("You cannot delete a Super Admin.");
    if (userId === currentUser?._id)
      return toast.warning("You cannot delete your own account.");

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin text-primary w-6 h-6 mr-2" />
        <span>Loading users...</span>
      </div>
    );

  const handleAddUser = async () => {
    try {
      await addUser({ name, email, password, role });
      toast.success("User added successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("ADMIN");
      refetch();
    } catch (error) {
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6  lg:px-0 lg:py-2.5 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
        <div className="flex gap-2">
          {currentUser?.role === "SUPER_ADMIN" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as "SUPER_ADMIN" | "ADMIN")
                    }>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                  </select>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddUser}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}>
            <RefreshCcw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {allUsers.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg shadow-none">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-center">#</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user: any, index: number) => (
                <TableRow key={user._id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Avatar className="rounded size-8">
                      <AvatarImage
                        className="rounded"
                        src={
                          user?.image
                            ? `${import.meta.env.VITE_API_URL}${user.image}`
                            : undefined
                        }
                        alt={user?.name || "User avatar"}
                      />
                      <AvatarFallback className="rounded">
                        <Image className="size-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell className="text-start">
                    <Badge
                      variant={
                        user.isActive === "ACTIVE" ? "default" : "destructive"
                      }
                      className="capitalize">
                      {user.isActive}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    {user.role !== "SUPER_ADMIN" &&
                    user._id !== currentUser?._id ? (
                      <Button
                        variant="destructive"
                        size="xs"
                        onClick={() => handleDelete(user._id, user.role)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-xs italic">
                        Not allowed
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}
