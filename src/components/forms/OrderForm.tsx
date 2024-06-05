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
    selectOrdersCurrentItem,
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
          }),
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

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{formHeading} order</h3>

      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isSubmitting || status === "pending"}
          loading={isSubmitting || status === "pending"}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
