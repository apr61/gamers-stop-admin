import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import { UserFormData } from "../../utils/types";
import { EmailRegex, MobileNumberRegex } from "../../utils/regex";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  addUser,
  editUser,
  resetUserCurrentItem,
  selectUserCurrentItem,
} from "../../redux/slice/usersSlice";
import { useEffect } from "react";

const UserForm = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<UserFormData>();
  const { action, record, error, status } = useAppSelector(
    selectUserCurrentItem
  );
  const dispatch = useAppDispatch();
  const FormHeading = action === "create" ? "Add new" : "Edit";
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    if (action === "create") {
      await dispatch(addUser(data));
    }
    if (action === "update" && record !== null) {
      await dispatch(editUser({ data, id: record.id }));
    }
    reset();
    dispatch(resetUserCurrentItem());
  };
  useEffect(() => {
    if (record) {
      setValue("full_name", record.full_name);
      setValue("email", record.email);
      setValue("phone", record.phone);
      setValue("user_role", record.user_role);
      return;
    }
    reset();
  }, [record, reset]);
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl">{FormHeading} user</h2>
      <Input
        label="Name"
        placeholder="Your name"
        {...register("full_name", {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be atleast 3 characters",
          },
          validate: (value) => value.trim().length >= 3 || "Name is required",
        })}
      />
      {errors.full_name && (
        <p className="text-red-500">{errors.full_name.message}</p>
      )}
      <Input
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: EmailRegex,
            message: "Email must be valid",
          },
        })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Input
        label="Phone"
        placeholder="+91-000000000"
        type="text"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: MobileNumberRegex,
            message: "Phone number must be valid",
          },
        })}
      />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      <div>
        <p className="text-lg">User role</p>
        <div>
          <div className="flex gap-2 text-xl items-center">
            <input
              type="radio"
              id="user"
              value="USER"
              {...register("user_role")}
              checked={true}
              className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:border-blue-200 checked:bg-blue-500"
            />
            <label htmlFor="user" className="text-lg cursor-pointer">
              User
            </label>
          </div>
          <div className="flex gap-2 text-xl items-center">
            <input
              type="radio"
              id="admin"
              value="ADMIN"
              {...register("user_role")}
              className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:border-blue-300 checked:bg-blue-500"
            />
            <label htmlFor="admin" className="text-lg cursor-pointer">
              Admin
            </label>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || status === "pending"}
        loading={isSubmitting || status === "pending"}
      >
        Save
      </Button>
    </form>
  );
};

export default UserForm;
