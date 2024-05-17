import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  createNewCategory,
  selectCreatedItem,
  CurrentType,
  editCategory,
} from "../../redux/slice/categoriesSlice";
import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import Input from "../ui/Input";
import { CategoryFormData, CategoryFormValues } from "../../utils/types";
import ImagePreview from "../ImagePreview";
import UrlToFileList from "../../utils/urlToFileList";

type CategoriesFormProps = CurrentType;

const CategoriesForm = ({ record, action }: CategoriesFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>();
  const { status, error } = useAppSelector(selectCreatedItem);
  const formHeading = action === "create" ? "Add new" : "Edit";
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const dispatch = useAppDispatch()
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
        const newCategory: Omit<CategoryFormData, "imageUrls" | "id">= {
          category_name: data.categoryName,
          files: data.images!,
      };
      await dispatch(createNewCategory(newCategory));
    } else {
      const updatedCategoryData : CategoryFormData = {
        id: record?.id!,
        category_name: data.categoryName,
        files: data.images!,
        imageUrls: [record?.category_image!]
      }
      await dispatch(
        editCategory(updatedCategoryData)
      );
    }
    reset({ categoryName: "", images: null });
    setImagePreviews([]);
  };

  const handleDelete = async (url: string) => {
    setImagePreviews((prev) => prev.filter((imgUrl) => imgUrl != url));
    setValue("images", null)
  };

  useEffect(() => {
    const initializeForm = async () => {
      if (record) {
        const fileList = await UrlToFileList(record.category_image);
        setValue("images", fileList);
        setValue("categoryName", record.category_name);
        setImagePreviews([record.category_image]);
        return;
      }
      reset({ categoryName: "", images: null });
      setImagePreviews([]);
    };

    initializeForm();
  }, [record, reset, setValue]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{formHeading} category</h3>
      <Input
        placeholder="Category Name"
        label="Category name"
        {...register("categoryName", { required: "Category name is required" })}
      />
      {errors.categoryName && (
        <p className="text-red-500">{errors.categoryName.message}</p>
      )}
      <FileInput
        label="Image"
        {...register("images", {
          required: imagePreviews.length === 0 ? "Category image is required" : false,
          onChange: handleFileChange,
        })}
      />
      <ImagePreview images={imagePreviews} handleOnClick={handleDelete} />
      {errors.images && <p className="text-red-500">{errors.images.message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting || status === "pending"}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CategoriesForm;
