import AddressDelete from "@/features/addresses/components/AddressDelete";
import AddressHeader from "@/features/addresses/components/AddressHeader";
import AddressList from "@/features/addresses/components/AddressList";
import CreateAddress from "@/features/addresses/components/CreateAddress";
import EditAddress from "@/features/addresses/components/EditAddress";
import ReadAddress from "@/features/addresses/components/ReadAddress";

const Addresses = () => {
	return (
		<div className="my-8">
			<AddressHeader />
			<div className="my-4">
				<AddressList />
			</div>
			<AddressDelete />
			<CreateAddress />
			<EditAddress />
			<ReadAddress />
		</div>
	);
};

export default Addresses