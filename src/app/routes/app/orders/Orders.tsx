import OrderHeader from "@/features/orders/components/OrderHeader";
import ListOrders from "@/features/orders/components/ListOrders";
import DeleteOrder from "@/features/orders/components/DeleteOrder";

const Orders = () => {
	return (
		<div className="my-8">
			<OrderHeader />
			<div className="my-4">
				<ListOrders />
			</div>
			<DeleteOrder />
		</div>
	);
};

export default Orders;
