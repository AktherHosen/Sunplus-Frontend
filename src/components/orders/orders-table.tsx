// src/components/orders/OrdersTable.tsx
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/baseApi";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const OrdersTable = () => {
  const { data: orders, isLoading, isError, refetch } = useGetAllOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to fetch orders</p>;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateOrderStatus({ id, status }).unwrap();
      toast.success("Order status updated!");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.data?.map((order, idx) => (
          <TableRow key={order._id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{order.name}</TableCell>
            <TableCell>{order.productName}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>
              <Select
                defaultValue={order.status}
                onValueChange={(val) => handleStatusChange(order._id, val)}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {["pending", "processing", "shipped", "delivered"].map(
                    (status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(order._id)}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
