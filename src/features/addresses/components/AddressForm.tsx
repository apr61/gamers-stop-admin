import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { AddressFormValues } from "@/types/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/checkbox";
import { selectUsers, fetchUsers } from "@/features/users/usersSlice";
import { useEffect, useState } from "react";
import { MobileNumberRegex } from "@/utils/regex";

type AddressFormProps = {
  address?: AddressFormValues;
  isDefaultAddress?: boolean;
  title: string;
  onSaveFn: (data: AddressFormValues) => Promise<void>;
};

const AddressForm = ({
  address,
  isDefaultAddress = false,
  title,
  onSaveFn,
}: AddressFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddressFormValues>({
    defaultValues: address ? address : undefined,
  });
  const [isDefaultInput, setIsDefaultInput] =
    useState<boolean>(isDefaultAddress);
  const onSubmit: SubmitHandler<AddressFormValues> = async (data) => {
    await onSaveFn(data);
    reset();
    setIsDefaultInput(false);
  };

  console.log(address);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{title}</h3>
      <Input
        placeholder="Name"
        label="Name"
        {...register("name", {
          required: "Name is required",
        })}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <Input
        placeholder="Mobile number"
        label="Mobile number"
        {...register("phoneNumber", {
          required: "Mobile number is required",
          pattern: {
            value: MobileNumberRegex,
            message: "Mobile number must be valid",
          },
        })}
      />
      {errors.phoneNumber && (
        <p className="text-red-500">{errors.phoneNumber.message}</p>
      )}
      <Input
        placeholder="Flat no, building"
        label="Address"
        {...register("address", {
          required: "Address is required",
          validate: (value) => value.trim().length > 0 || "Address is required",
        })}
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message}</p>
      )}
      <Input
        placeholder="Town/Locality"
        label="Town/Locality"
        {...register("townLocality", {
          required: "Town/locality is required",
          validate: (value) =>
            value.trim().length > 0 || "Town/locality is required",
        })}
      />
      {errors.townLocality && (
        <p className="text-red-500">{errors.townLocality.message}</p>
      )}
      <Input
        placeholder="City/District"
        label="City/District"
        {...register("cityDistrict", {
          required: "City/District is required",
          validate: (value) =>
            value.trim().length > 0 || "City/District is required",
        })}
      />
      {errors.cityDistrict && (
        <p className="text-red-500">{errors.cityDistrict.message}</p>
      )}
      <Input
        placeholder="State"
        label="State"
        {...register("state", {
          required: "State is required",
          validate: (value) => value.trim().length > 0 || "State is required",
        })}
      />
      {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      <Input
        placeholder="Pincode"
        label="Pincode"
        {...register("pincode", {
          required: "Pincode is required",
          validate: (value) => value.trim().length > 0 || "Pincode is required",
          minLength: {
            value: 6,
            message: "Pincode must be at least 6 characters long",
          },
        })}
      />
      {errors.pincode && (
        <p className="text-red-500">{errors.pincode.message}</p>
      )}
      <CheckBox
        label="Mark Default"
        {...register("isDefault", {
          onChange: (e) => setIsDefaultInput(e.target.checked),
        })}
        isChecked={isDefaultInput}
      />
      <UserSelect
        register={register}
        errors={errors}
        currentUserId={address ? address.userId : ""}
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;

type UserSelectProps = {
  register: UseFormRegister<AddressFormValues>;
  errors: FieldErrors<AddressFormValues>;
  currentUserId: number | string;
};

const UserSelect = ({ register, errors, currentUserId }: UserSelectProps) => {
  const { data: users, status, error } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      <div className="w-full flex gap-2 flex-col">
        <label htmlFor="category" className="text-lg cursor-pointer">
          User
        </label>
        <select
          id="category"
          className={`w-full p-4 bg-white border rounded-md cursor-pointer`}
          {...register("userId", { required: "User is required" })}
        >
          <option value="">Select user</option>
          {status === "pending" ? (
            <option value="">Loading...</option>
          ) : (
            users
              .filter((user) => user.user_role === "user")
              .map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  className={`${
                    currentUserId === user.id ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {user.full_name}
                </option>
              ))
          )}
        </select>
      </div>
      {errors.userId && <p className="text-red-500">{errors.userId.message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
