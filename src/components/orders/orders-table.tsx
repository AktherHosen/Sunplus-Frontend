import AdminOrderForm from "@/components/orders/admin-order-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const OrdersTable = () => {
  const { data: orders, isLoading, isError, refetch } = useGetAllOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const allowedStatuses = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to fetch orders</p>;

  const handleDelete = (id: string) => {
    toast.warning("Are you sure you want to delete this order?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteOrder(id).unwrap();
            toast.success("Order deleted successfully!");
            refetch();
          } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete order");
          }
        },
      },
    });
  };

  const handleStatusChange = async (id: string, status: string) => {
    if (!allowedStatuses.includes(status))
      return toast.error("Invalid status!");
    try {
      await updateOrderStatus({ id, status }).unwrap();
      toast.success("Order status updated!");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingOrder(null);
                setOpenDialog(true);
              }}
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingOrder ? "Edit Order" : "Create Order"}
              </DialogTitle>
            </DialogHeader>
            <AdminOrderForm
              existingOrder={editingOrder}
              onSuccess={() => {
                setOpenDialog(false);
                refetch();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.data?.length ? (
              orders.data.map((order, idx) => (
                <TableRow key={order._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.item?.name || "—"}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(val) =>
                        handleStatusChange(order._id, val)
                      }
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {allowedStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingOrder(order);
                        setOpenDialog(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
