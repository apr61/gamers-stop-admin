import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { BrandFormValues } from "../../utils/types";
import {
	addBrand,
	editBrand,
	selectBrandCurrentItem,
} from "../../redux/slice/brandsSlice";

const BrandForm = () => {
	const { action, record, status, error } = useAppSelector(
		selectBrandCurrentItem,
	);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<BrandFormValues>();
	const formHeading = action === "create" ? "Add new" : "Edit";
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<BrandFormValues> = async (data) => {
		if (action === "create") {
			await dispatch(addBrand({ formData: data, tableName: "brands" }));
		} else {
			if (record)
				await dispatch(
					editBrand({
						id: record.id!,
						tableName: "brands",
						formData: data,
					}),
				);
		}
		reset();
	};

	useEffect(() => {
		const initializeForm = async () => {
			if (record) {
				setValue("brand_name", record.brand_name);
				return;
			}
			reset();
		};

		initializeForm();
	}, [record, reset, setValue]);

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<h3 className="text-xl">{formHeading} brand</h3>
			<Input
				placeholder="Brand Name"
				label="Brand name"
				{...register("brand_name", {
					required: "Category name is required",
				})}
			/>
			{errors.brand_name && (
				<p className="text-red-500">{errors.brand_name.message}</p>
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

export default BrandForm;
