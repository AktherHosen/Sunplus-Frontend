import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateOrderMutation,
  useGetAllProductsQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/baseApi";
import type { OrderStatus } from "@/types/order";
import type { IProduct } from "@/types/product";
import { useState } from "react";
import { toast } from "sonner";

interface AdminOrderFormProps {
  existingOrder?: any;
  onSuccess: () => void;
}

const AdminOrderForm = ({ existingOrder, onSuccess }: AdminOrderFormProps) => {
  const [form, setForm] = useState({
    name: existingOrder?.name || "",
    phone: existingOrder?.phone || "",
    address: existingOrder?.address || "",
    item: existingOrder?.item?._id || "",
    quantity: existingOrder?.quantity || 1,
    status: (existingOrder?.status?.toUpperCase() as OrderStatus) || "PENDING",
  });

  const ORDER_STATUSES: OrderStatus[] = ["PENDING", "COMPLETED", "CANCELLED"];

  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery();

  const products: IProduct[] = productData?.data || [];

  const [createOrder, { isLoading: creating }] = useCreateOrderMutation();
  const [updateOrderStatus, { isLoading: updating }] =
    useUpdateOrderStatusMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (existingOrder) {
        // Only update status when editing
        await updateOrderStatus({
          id: existingOrder._id,
          status: form.status,
        }).unwrap();
        toast.success("Order updated successfully!");
      } else {
        // Create order with default 'PENDING' status
        await createOrder({
          name: form.name,
          phone: form.phone,
          address: form.address,
          item: form.item,
          quantity: Number(form.quantity),
        }).unwrap();
        toast.success("Order created successfully!");
      }
      onSuccess();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      {/* Form fields (only for new order) */}
      {!existingOrder && (
        <>
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              placeholder="Enter delivery address"
            />
          </div>

          {/* Product */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select Product
            </label>
            <Select
              value={form.item}
              onValueChange={(val) => setForm({ ...form, item: val })}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    productLoading ? "Loading products..." : "Select a product"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <Input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              min={1}
              required
            />
          </div>
        </>
      )}

      {existingOrder && (
        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <Select
            value={form.status}
            onValueChange={(val) =>
              setForm({ ...form, status: val as OrderStatus })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={creating || updating}>
          {existingOrder ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default AdminOrderForm;
