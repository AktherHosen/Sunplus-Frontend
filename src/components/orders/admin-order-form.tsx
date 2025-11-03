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
import { Textarea } from "../ui/textarea";

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
    status: existingOrder?.status || "pending",
    orderNote: existingOrder?.orderNote || "",
  });

  const ORDER_STATUSES: OrderStatus[] = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

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
        await updateOrderStatus({
          id: existingOrder._id,
          status: form.status,
        }).unwrap();
        toast.success("Order updated successfully!");
      } else {
        await createOrder({
          name: form.name,
          phone: form.phone,
          address: form.address,
          item: form.item,
          orderNote: form.orderNote,
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
      {!existingOrder && (
        <>
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

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                Select Product
              </label>
              <Select
                value={form.item}
                onValueChange={(val) => setForm({ ...form, item: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      productLoading
                        ? "Loading products..."
                        : "Select a product"
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

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                min={1}
                required
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <Textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              placeholder="Enter delivery address"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Note</label>
            <Textarea
              value={form.orderNote}
              onChange={(e) => setForm({ ...form, orderNote: e.target.value })}
              required
              placeholder="Any Note?"
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
                  {status}
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
