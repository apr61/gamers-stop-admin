import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { BrandFormValues } from "@/types/api";

type BrandFormProps = {
	brand?: BrandFormValues
	onSavefn: (data: BrandFormValues) => Promise<void>,
	title: string
}

const BrandForm = ({brand, onSavefn, title} : BrandFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<BrandFormValues>({
		defaultValues: brand ? brand : {
			brand_name: "",
		}
	});

	const onSubmit: SubmitHandler<BrandFormValues> = async (data) => {
		await onSavefn(data)
		reset();
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<h3 className="text-xl">{title}</h3>
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
			<div className="flex gap-2">
				<Button
					type="submit"
					disabled={isSubmitting}
					loading={isSubmitting}
				>
					Save
				</Button>
			</div>
		</form>
	);
};

export default BrandForm;
