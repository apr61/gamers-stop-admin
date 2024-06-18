import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { ProductFormValues } from "@/types/api";
import FileInput from "@/components/ui/FileInput";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ImagePreview from "@/components/ImagePreview";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  selectCategories,
} from "@/features/categories/categorySlice";
import {
  addProduct,
  editProduct,
  selectProdcutsCurrentItem,
} from "@/features/products/productSlice";
import { fetchBrands, selectBrands } from "@/features/brands/brandsSlice";

type ProductFormProps = {
  product?: ProductFormValues;
  images?: string[];
};

const ProductsForm = ({ product, images }: ProductFormProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm<ProductFormValues>({
    defaultValues: product ? product : undefined,
  });
  const { action, record, error, status } = useAppSelector(
    selectProdcutsCurrentItem
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    images ? images : []
  );
  const dispatch = useAppDispatch();

  const FormHeading = action === "create" ? "Add new" : "Edit";

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    if (action === "create") {
      await dispatch(addProduct({ formData: data, tableName: "products" }));
    } else {
      if (record && "name" in record)
        await dispatch(
          editProduct({
            formData: data,
            tableName: "products",
            id: record.id,
          })
        );
    }
    reset();
    setImagePreviews([]);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl">{FormHeading} product</h3>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex flex-col gap-6 flex-[1] md:flex-[1.5] lg:flex-[3]">
          <ProductMain register={register} errors={errors} />
          <ProductGallery
            register={register}
            errors={errors}
            setImagePreviews={setImagePreviews}
            imagePreviews={imagePreviews}
            setValue={setValue}
          />
        </div>
        <div className="flex-[1] flex gap-6 flex-col">
          <CategorySelect
            register={register}
            errors={errors}
            currentCategoryId={
              record && "name" in record ? record.category_id : null
            }
          />

          <BrandSelect
            register={register}
            errors={errors}
            currentBrandId={
              record && "name" in record ? record.brand?.id! : null
            }
          />
          <div className="bg-dimBlack p-4 rounded-md shadow-md">
            <Input
              placeholder="Stock"
              label="Stock"
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
          </div>
          <div className="bg-dimBlack p-4 rounded-md shadow-md">
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
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
      </div>

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

type ProductFromType = {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
};

type CategorySelectProps = ProductFromType & {
  currentCategoryId: number | null;
};

const CategorySelect = ({
  register,
  errors,
  currentCategoryId,
}: CategorySelectProps) => {
  const { data: categories, status, error } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <div className="w-full flex gap-2 flex-col  shadow-md p-4 rounded-md bg-dimBlack">
        <label htmlFor="category" className="text-lg cursor-pointer">
          Category
        </label>
        <select
          id="category"
          className={`w-full p-4  border border-border rounded-md cursor-pointer bg-dimBlack`}
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
                className={`${
                  currentCategoryId === category.id
                    ? "bg-primary text-white"
                    : ""
                }`}
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

type BrandSelectProps = ProductFromType & {
  currentBrandId: number | null;
};

const BrandSelect = ({
  register,
  errors,
  currentBrandId,
}: BrandSelectProps) => {
  const { data, status, error } = useAppSelector(selectBrands);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);
  return (
    <>
      <div className="w-full flex gap-2 flex-col shadow-md p-4 rounded-md bg-dimBlack">
        <label htmlFor="brand" className="text-lg cursor-pointer">
          Brand
        </label>
        <select
          id="brand"
          className={`w-full p-4  border border-border rounded-md cursor-pointer bg-dimBlack`}
          {...register("brand_id", { required: "Brand is required" })}
        >
          <option value="">Select brand</option>
          {status === "pending" ? (
            <option value="">Loading...</option>
          ) : (
            data.map((brand) => (
              <option
                key={brand.id}
                value={brand.id}
                className={`${
                  currentBrandId === brand.id ? "bg-primary text-white" : ""
                }`}
              >
                {brand.brand_name}
              </option>
            ))
          )}
        </select>
      </div>
      {errors.brand_id && (
        <p className="text-red-500">{errors.brand_id.message}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

const ProductMain = ({ register, errors }: ProductFromType) => {
  return (
    <div className="bg-dimBlack shadow-md p-4 rounded-md flex flex-col gap-2">
      <Input
        placeholder="Product name"
        label="Name"
        {...register("name", { required: "Product name is required" })}
        autoFocus={true}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <div className="flex gap-2 flex-col">
        <label htmlFor="description" className="text-lg cursor-pointer">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="focus:outline focus:outline-2 focus:outline-blue-500 border border-border rounded-md p-2 resize-none bg-dimBlack"
          rows={10}
        ></textarea>
      </div>
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
};

type ProductGalleryType = ProductFromType & {
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  imagePreviews: string[];
  setValue: UseFormSetValue<ProductFormValues>;
};

const ProductGallery = ({
  register,
  errors,
  setImagePreviews,
  imagePreviews,
  setValue,
}: ProductGalleryType) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(filePreviews);
    }
  };
  const handleDelete = async (url: string) => {
    setImagePreviews((prev) => prev.filter((imgUrl) => imgUrl != url));
    setValue("images", null);
  };
  return (
    <div className="bg-dimBlack shadow-md p-4 rounded-md flex flex-col gap-2">
      <h2 className="text-lg">Product Gallery</h2>
      <div className="min-h-[10rem]">
        <FileInput
          label="Click to upload images"
          {...register("images", {
            required:
              imagePreviews.length === 0 ? "Category image is required" : false,
            onChange: handleFileChange,
          })}
          multiple={true}
        />
      </div>
      <ImagePreview images={imagePreviews} handleOnClick={handleDelete} />
      {errors.images && <p className="text-red-500">{errors.images.message}</p>}
    </div>
  );
};
