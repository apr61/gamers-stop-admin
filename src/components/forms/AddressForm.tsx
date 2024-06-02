import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { AddressFormValues } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { fetchUsers, selectUsers } from "../../redux/slice/profilesSlice";
import { useEffect, useState } from "react";
import {
  addAddress,
  editAddress,
  resetAddressCurrentItem,
  selectAddressCurrentItem,
} from "../../redux/slice/addressSlice";
import CheckBox from "../ui/checkbox";

const AddressForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<AddressFormValues>();
  const [checked, setChecked] = useState<boolean>(false);
  const { status, action, record } = useAppSelector(selectAddressCurrentItem);
  const formHeading = action === "create" ? "Add" : "Edit";
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<AddressFormValues> = async (data) => {
    if (action === "create") {
      await dispatch(addAddress({ formData: data }));
    } else {
      if (record) {
        await dispatch(editAddress({ formData: data, id: record.id }));
      }
    }
    reset();
    setChecked(false)
    resetAddressCurrentItem();
  };
  useEffect(() => {
    const initializeForm = async () => {
      if (record) {
        setValue("name", record.name);
        setValue("phoneNumber", record.phoneNumber);
        setValue("address", record.address);
        setValue("cityDistrict", record.cityDistrict);
        setValue("state", record.state);
        setValue("townLocality", record.townLocality);
        setValue("pincode", record.pincode);
        setValue("isDefault", record.isDefault);
        setValue("userId", record.userId);
        setChecked(record.isDefault);
        return;
      }
      reset();
    };

    initializeForm();
  }, [record, reset, setValue]);
  const MobileNumberRegex = /^[6-9]{1}[0-9]{9}$/;

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{formHeading} address</h3>
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
        label="Is Default"
        {...register("isDefault", {
          onChange: (e) => setChecked(e.target.checked),
        })}
        isChecked={checked}
      />
      <UserSelect
        register={register}
        errors={errors}
        currentUserId={record ? record.id : ""}
      />
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

export default AddressForm;

type UserSelectProps = {
  register: UseFormRegister<AddressFormValues>;
  errors: FieldErrors<AddressFormValues>;
  currentUserId: number | string;
};

const UserSelect = ({ register, errors, currentUserId }: UserSelectProps) => {
  const { users, status, error } = useAppSelector(selectUsers);
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
              .filter((user) => user.user_role === "USER")
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
