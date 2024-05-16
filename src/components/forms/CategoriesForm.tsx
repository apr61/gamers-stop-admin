import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useEffect } from "react";
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
import { Category, CategoryFormValues } from "../../utils/types";
import {
  addFiles,
  editFiles,
  removeFiles,
  resetFileHandling,
  selectFileHandlingData,
  setPublicUrls,
} from "../../redux/slice/fileHandlingSlice";
import ImagePreview from "../ImagePreview";

type CategoriesFormProps = CurrentType;

const CategoriesForm = ({ record, action }: CategoriesFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectCreatedItem);
  const formHeading = action === "create" ? "Add new" : "Edit";
  const {
    publicUrls,
    status: fileStatus,
    error: fileError,
  } = useAppSelector(selectFileHandlingData);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    switch (action) {
      case "create": {
        if (e.target.files) {
          await dispatch(addFiles(e.target.files));
        }
        break;
      }
      case "update": {
        if (e.target.files) {
          await dispatch(
            editFiles({
              files: e.target.files,
              path: [record?.category_image!],
            })
          );
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    if (action === "create") {
      const newCategory: Omit<Category, "id"> = {
        category_image: publicUrls[0],
        category_name: data.categoryName,
      };
      await dispatch(createNewCategory(newCategory));
    } else {
      await dispatch(
        editCategory({
          id: record?.id as string,
          category_name: data.categoryName,
          category_image: publicUrls[0],
        })
      );
    }
    reset({ categoryName: "", images: undefined });
    dispatch(resetFileHandling());
  };

  const handleDelete = async (url: string) => {
    await dispatch(removeFiles([url]));
  };

  useEffect(() => {
    if (record) {
      setValue("categoryName", record.category_name);
      dispatch(setPublicUrls([record.category_image]));
    } else {
      reset({ categoryName: "", images: undefined });
      dispatch(resetFileHandling())
    }
  }, [record, reset]);

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
      {fileStatus === "pending" ? (
        <p>Loading...</p>
      ) : (
        <FileInput
          label="Image"
          {...register("images", {
            required:
              publicUrls.length === 0 ? "Category image is required" : false,
            onChange: handleFileChange,
          })}
        />
      )}
      <ImagePreview images={publicUrls} handleOnClick={handleDelete} />
      {errors.images && <p className="text-red-500">{errors.images.message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      {fileError && <p className="text-red-500">{fileError}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting || status === "pending"}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CategoriesForm;
