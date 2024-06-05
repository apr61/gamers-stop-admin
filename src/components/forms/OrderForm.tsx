import { SubmitHandler, useForm } from "react-hook-form";
import {
  addOrder,
  editOrder,
  selectOrdersCurrentItem,
} from "../../redux/slice/ordersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { OrderFormValues } from "../../utils/types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect } from "react";

const OrderForm = () => {
  const { action, record, status, error } = useAppSelector(
    selectOrdersCurrentItem
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>();
  const formHeading = action === "create" ? "Add new" : "Edit";
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    if (action === "create") {
      await dispatch(addOrder({ formData: data }));
    } else {
      if (record)
        await dispatch(
          editOrder({
            id: record.id!,
            tableName: "brands",
            formData: data,
          })
        );
    }
    reset();
  };

  useEffect(() => {
    const initializeForm = async () => {
      if (record) {
        return;
      }
      reset();
    };

    initializeForm();
  }, [record, reset, setValue]);

  const handleSave = async () => {
    const newOrder: OrderFormValues = {
      user_id: "a1899ff7-8b91-409d-aa11-c4a19f0892ad",
      address_id: 1,
      payment_status: "paid",
      order_status: "confirmed",
      total_price: 2600,
      products_ordered: [{ "id": 8, "quantity": 1 }, { "id": 11, "quantity": 1 }],
    };
    await dispatch(addOrder({ formData: newOrder }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{formHeading} order</h3>

      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2">
        <Button
          type="button"
          disabled={isSubmitting || status === "pending"}
          loading={isSubmitting || status === "pending"}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
