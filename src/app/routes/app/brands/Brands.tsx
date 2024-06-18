import BrandHeader from "@/features/brands/components/BrandHeader";
import ListBrands from "@/features/brands/components/ListBrands";
import CreateBrand from "@/features/brands/components/CreateBrand";
import EditBrand from "@/features/brands/components/EditBrand";
import DeleteBrand from "@/features/brands/components/DeleteBrand";

const Orders = () => {
	return (
		<div className="my-8">
			<BrandHeader />
			<div className="my-4">
				<ListBrands />
			</div>
			<CreateBrand />
			<EditBrand />
			<DeleteBrand />
		</div>
	);
};

export default Orders;
