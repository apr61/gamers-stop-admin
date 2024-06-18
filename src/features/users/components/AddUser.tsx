import Modal from "@/components/ui/Modal";
import { resetUserCurrentItem, selectUserCurrentItem } from "../usersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailRegex } from "@/utils/regex";
import Button from "@/components/ui/Button";

const AddUser = () => {
  const { action } = useAppSelector(selectUserCurrentItem);
  const dispatch = useAppDispatch();
  const { isOpen, open, close } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ email: string }>();

  const handleClose = () => {
    close();
    dispatch(resetUserCurrentItem());
  };

  useEffect(() => {
    if (action === "create") {
      open();
      reset();
    }
  }, [action]);

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {};

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Invite a new user"
      className="max-w-[25rem] w-full"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: { value: EmailRegex, message: "Email must be valid" },
          })}
          label="User email"
          placeholder="user@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 h-4">{errors.email.message}</p>
        )}
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Invite user
        </Button>
      </form>
    </Modal>
  );
};

export default AddUser;
