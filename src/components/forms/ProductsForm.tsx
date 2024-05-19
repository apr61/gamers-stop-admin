import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormValues } from "../../utils/types";
import FileInput from "../ui/FileInput";
import { ChangeEvent, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ImagePreview from "../ImagePreview";
import Select from "../ui/Select";
import { useAppDispatch } from "../../redux/store/hooks";
import { createNewEntity } from "../../redux/slice/crudSlice";

const ProductsForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset
  } = useForm<ProductFormValues>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(filePreviews);
    }
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    data = {
      ...data,
      category_id: "c0f647bc-b318-4c42-ab11-69860e87c3e9",
    };
    await dispatch(createNewEntity({ formData: data, tableName: "products" }));
    reset()
    setImagePreviews([]);
  };

  const handleDelete = async (url: string) => {
    setImagePreviews((prev) => prev.filter((imgUrl) => imgUrl != url));
    setValue("images", null);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">New product</h3>
      <Input
        placeholder="Product name"
        label="Name"
        {...register("name", { required: "Product name is required" })}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <FileInput
        label="Image"
        {...register("images", {
          required:
            imagePreviews.length === 0 ? "Category image is required" : false,
          onChange: handleFileChange,
        })}
        multiple={true}
      />
      <ImagePreview images={imagePreviews} handleOnClick={handleDelete} />
      {errors.images && <p className="text-red-500">{errors.images.message}</p>}

      <Input
        placeholder="Description"
        label="Description"
        {...register("description", { required: "Description is required" })}
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <Input
        placeholder="Quantity"
        label="Quantity"
        type="number"
        {...register("quantity", {
          required: "Quantity is required",
          min: {
            value: 1,
            message: "Quantity must be greater that 1",
          },
        })}
      />
      {errors.quantity && (
        <p className="text-red-500">{errors.quantity.message}</p>
      )}

      <Input
        placeholder="Price"
        label="Price"
        type="number"
        {...register("price", {
          required: "Price is required",
          min: {
            value: 1,
            message: "Price must be greater that 1",
          },
        })}
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      <Select
        className=""
        label="Category"
        {...register("category_id", { required: "Category is required" })}
      />
      {errors.category_id && (
        <p className="text-red-500">{errors.category_id.message}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProductsForm;
