import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  createNewCategory,
  selectCreatedItem,
  CurrentType,
  editCategory,
} from "../../redux/slice/categoriesSlice";
import UrlToFileList from "../../utils/urlToFileList";
import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import Input from "../ui/Input";
import { CategoryFormValues } from "../../utils/types";
import {
  addFiles,
  selectFileHandlingData,
} from "../../redux/slice/fileHandlingSlice";
import { DeleteOutlined } from "@ant-design/icons";

type CategoriesFormProps = CurrentType;

const CategoriesForm = ({ record, action }: CategoriesFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>();
  const [imagePreview, setImagePreview] = useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectCreatedItem);
  const formHeading = action === "create" ? "Add new" : "Edit";
  const {
    publicUrls,
    status: fileStatus,
    error: fileError,
  } = useAppSelector(selectFileHandlingData);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await dispatch(addFiles(e.target.files));
    }
  };

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    if (action === "create") {
      await dispatch(createNewCategory(data));
    } else {
      await dispatch(editCategory({ category: record!, categoryForm: data }));
    }
    reset({ categoryName: "", images: undefined });
    setImagePreview(null);
  };

  useLayoutEffect(() => {
    if (record) {
      setValue("categoryName", record.category_name);
      (async () => {
        const fileData = await UrlToFileList(record.category_image!);
        setValue("images", fileData);
        setImagePreview(fileData);
      })();
    } else {
      reset({ categoryName: "", images: undefined });
      setImagePreview(null);
    }
  }, [record, setValue, reset]);

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
            required: "Category image is required",
            onChange: handleFileChange,
          })}
        />
      )}
      <ImagePreview images={publicUrls} />
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

type ImagePreviewProps = {
  images: string[];
};

const ImagePreview = ({ images }: ImagePreviewProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {images.map((url, index) => (
        <div
          key={url}
          className="w-16 h-16 relative hover:brightness-[85%] group transistion ease-in-out duration-150"
        >
          <img src={url} alt={`image ` + index} className="w-full h-full" />
          <button className="hidden group-hover:block text-red-600 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <DeleteOutlined />
          </button>
        </div>
      ))}
    </div>
  );
};
