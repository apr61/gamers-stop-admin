import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Input from "@/components/ui/Input";
import { CategoryFormValues } from "@/types/api";
import ImagePreview from "@/components/ImagePreview";
import UrlToFileList from "@/utils/urlToFileList";
import {
  addCategory,
  editCategory,
  selectCategoryCurrentItem,
} from "../categorySlice";

type CategoryFormProps = {
  title: string;
};

const CategoryForm = ({ title }: CategoryFormProps) => {
  const { action, record, status, error } = useAppSelector(
    selectCategoryCurrentItem
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>();
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

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    if (action === "create") {
      await dispatch(addCategory(data));
    } else {
      if (record)
        await dispatch(
          editCategory({
            id: record.id!,
            formData: data,
          })
        );
    }
    reset();
    setImagePreviews([]);
  };

  const handleDelete = async (url: string) => {
    setImagePreviews((prev) => prev.filter((imgUrl) => imgUrl != url));
    setValue("category_image", null);
  };

  useEffect(() => {
    const initializeForm = async () => {
      if (record) {
        const fileList = await UrlToFileList([record.category_image]);
        setValue("category_image", fileList);
        setValue("category_name", record.category_name);
        setImagePreviews([record.category_image]);
        return;
      }
      reset();
      setImagePreviews([]);
    };

    initializeForm();
  }, [record, reset, setValue]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{title}</h3>
      <Input
        placeholder="Category Name"
        label="Category name"
        {...register("category_name", {
          required: "Category name is required",
        })}
      />
      {errors.category_name && (
        <p className="text-red-500">{errors.category_name.message}</p>
      )}
      <FileInput
        label="Image"
        {...register("category_image", {
          required:
            imagePreviews.length === 0 ? "Category image is required" : false,
          onChange: handleFileChange,
        })}
      />
      <ImagePreview images={imagePreviews} handleOnClick={handleDelete} />
      {errors.category_image && (
        <p className="text-red-500">{errors.category_image.message}</p>
      )}
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

export default CategoryForm;
