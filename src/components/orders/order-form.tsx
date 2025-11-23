import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useCreateOrderMutation } from "@/redux/api/baseApi";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

interface OrderFormProps {
  productId: string;
  productName: string;
  maxQuantity: number;
  selectedVariants?: {
    watt?: string;
    size?: string;
  };
  onSuccess?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  productId,
  maxQuantity,
  selectedVariants,
  onSuccess,
}) => {
  const [createOrder, { isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order placed successfully!");
      formRef.current?.reset();
      onSuccess?.();
    } else if (isError) {
      const msg = (error as any)?.data?.message || "Failed to place order";
      toast.error(msg);
    }
  }, [isSuccess, isError, error, onSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const order = Object.fromEntries(formData.entries());

    // Extract the variant value (watt or size)
    const variant =
      selectedVariants?.watt || selectedVariants?.size || undefined;

    createOrder({
      item: { _id: productId } as any,
      quantity: Number(order.quantity),
      variant: variant,
      ...order,
    });
  };

  return (
    <form ref={formRef} className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded-md p-2 mt-1"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full border rounded-md p-2 mt-1"
            placeholder="01XXXXXXXXX"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          min={1}
          max={maxQuantity}
          defaultValue={1}
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>

      {/* Display Selected Variants */}
      {selectedVariants && (selectedVariants.watt || selectedVariants.size) && (
        <div className="p-3 bg-muted/50 rounded-lg border">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Selected Variant
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedVariants.watt && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium">
                <span className="text-muted-foreground">Watt:</span>
                {selectedVariants.watt}
              </div>
            )}
            {selectedVariants.size && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium">
                <span className="text-muted-foreground">Size:</span>
                {selectedVariants.size}
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-gray-700">Address</label>
        <Textarea
          name="address"
          required
          className="w-full border rounded-md p-2 mt-1"
          placeholder="Enter your delivery address"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Note</label>
        <Textarea
          name="orderNote"
          className="w-full border rounded-md p-2 mt-1"
          placeholder="Any Note? (Optional)"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-primary text-white"
          disabled={isLoading}
        >
          {isLoading ? "Placing..." : "Confirm Order"}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
