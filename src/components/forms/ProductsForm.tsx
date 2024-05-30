import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { ProductFormValues } from "../../utils/types";
import FileInput from "../ui/FileInput";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ImagePreview from "../ImagePreview";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  createNewEntity,
  editEntity,
  selectCurrentItem,
} from "../../redux/slice/crudSlice";
import UrlToFileList from "../../utils/urlToFileList";
import {
  fetchCategories,
  selectCategories,
} from "../../redux/slice/categorySlice";

const ProductsForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm<ProductFormValues>();
  const { action, record, error, status } = useAppSelector(selectCurrentItem);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const FormHeading = action === "create" ? "Add new" : "Edit";

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews(filePreviews);
    }
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    if (action === "create") {
      await dispatch(
        createNewEntity({ formData: data, tableName: "products" }),
      );
    } else {
      if (record && "name" in record)
        await dispatch(
          editEntity({
            formData: data,
            tableName: "products",
            id: record.id,
          }),
        );
    }
    reset();
    setImagePreviews([]);
  };

  const handleDelete = async (url: string) => {
    setImagePreviews((prev) => prev.filter((imgUrl) => imgUrl != url));
    setValue("images", null);
  };

  useLayoutEffect(() => {
    const initializeForm = async () => {
      if (record && "name" in record) {
        const fileList = await UrlToFileList(record.images);
        setValue("name", record.name);
        setValue("price", record.price);
        setValue("description", record.description);
        setValue("quantity", record.quantity);
        setValue("category_id", record.category_id.toString());
        setValue("images", fileList);
        setImagePreviews(record.images);
        return;
      }
      reset();
      setImagePreviews([]);
    };

    initializeForm();
  }, [record, reset, setValue]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{FormHeading} product</h3>
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

      <CategorySelect
        register={register}
        errors={errors}
        currentCategoryId={
          record && "name" in record ? record.category_id : null
        }
      />

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

export default ProductsForm;

type CategorySelectProps = {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  currentCategoryId: number | null;
};

const CategorySelect = ({
  register,
  errors,
  currentCategoryId,
}: CategorySelectProps) => {
  const { categories, status, error } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <div className="w-full flex gap-2 flex-col">
        <label htmlFor="category" className="text-lg cursor-pointer">
          Category
        </label>
        <select
          id="category"
          className={`w-full p-4 bg-white border rounded-md cursor-pointer`}
          {...register("category_id", { required: "Category is required" })}
        >
          <option value="">Select category</option>
          {status === "pending" ? (
            <option value="">Loading...</option>
          ) : (
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className={`${currentCategoryId === category.id ? "bg-blue-500 text-white" : ""}`}
              >
                {category.category_name}
              </option>
            ))
          )}
        </select>
      </div>
      {errors.category_id && (
        <p className="text-red-500">{errors.category_id.message}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
