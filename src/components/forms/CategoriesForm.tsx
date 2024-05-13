import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import FileInput from "../ui/FleInput";
import Input from "../ui/Input";
import { ChangeEvent, useState } from "react";
import ImagePreview from "../imagePreview/ImagePreview";
import { CategoryFormValues } from "../../utils/types";
import {
  createNewCategory,
  selectCreatedItem,
} from "../../redux/slice/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

const CategoriesForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>();
  const [imagePreview, setImagePreview] = useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectCreatedItem);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = e.target.files;
      setImagePreview(images);
    }
  };

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    await dispatch(createNewCategory(data));
    reset({ categoryName: "" });
    setImagePreview(null);
  };

  if (error) return <p>{error}</p>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">Add new Category</h3>
      <Input
        placeholder="Category Name"
        label="Category name"
        {...register("categoryName", { required: "Category name is required" })}
      />
      {errors && errors.categoryName && (
        <p className="text-red-500">{errors.categoryName?.message}</p>
      )}
      <FileInput
        label="Image"
        {...register("images", {
          required: "Category image is required",
          onChange: handleFileChange,
        })}
      />
      <ImagePreview images={imagePreview as FileList} />
      {errors && errors.images && (
        <p className="text-red-500">{errors.images?.message}</p>
      )}
      <div className="flex gap-2">
        <Button disabled={isSubmitting || status === "pending"}>Save</Button>
      </div>
    </form>
  );
};

export default CategoriesForm;
