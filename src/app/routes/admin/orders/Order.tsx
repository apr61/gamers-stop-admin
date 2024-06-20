import {
	CreditCardOutlined,
	EnvironmentOutlined,
	MailOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { selectOrdersCurrentItem } from "@/features/orders/orderSlice";
import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router-dom";
import { ColumnConfig, ProductsOrdered } from "@/types/api";
import Table from "@/components/ui/Table";
import { currencyFormatter } from "@/utils/currencyFormatter";
import BlankUserProfile from "@/assets/blank-profile-picture.webp"

export const Order = () => {
	const { record } = useAppSelector(
		selectOrdersCurrentItem,
	);

	if (record === null) return <Navigate to="/orders" />;

	const columns: ColumnConfig<ProductsOrdered>[] = [
		{
			title: "Product",
			render: (record: ProductsOrdered) => (
				<div className="flex gap-2 items-center">
					<img
						src={record.product?.images[0]}
						alt={record.product?.name}
						className="w-10 h-10"
					/>
					<p>{record.product?.name}</p>
				</div>
			),
		},
		{
			title: "Unit price",
			render: (record: ProductsOrdered) =>
				record.product ? currencyFormatter(record.product.price) : null,
		},
		{
			title: "Qty",
			render: (record: ProductsOrdered) =>
				record.quantity_ordered.toString(),
		},
		{
			title: "Total amount",
			render: (record: ProductsOrdered) =>
				record.product ? (
					<span>
						{currencyFormatter(
							record.product.price * record.quantity_ordered,
						)}
					</span>
				) : null,
		},
	];

	const SubTotal = record.total_price;

	const shippingCharges = 100;
	const discount = 0;

	return (
		<div className="w-full p-4 rounded-md">
			<section>
				<h2 className="text-lg font-bold">
					Order ID: {record.order_number}
				</h2>
				<p>{new Date(record.order_date).toLocaleDateString()}</p>
			</section>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
				<section className="flex-1">
					<h2 className="flex gap-2 items-center text-lg text-gray-700 font-semibold border-b border-slate-200 pb-2">
						<UserOutlined className="w-8 h-8 grid place-content-center rounded-full bg-gray-200" />
						Customer
					</h2>
					<div className="flex flex-col gap-2 mt-4">
						<p className="text-lg font-semibold text-gray-600 flex gap-4">
							<img src={record.user?.avatar_url ? record.user?.avatar_url : BlankUserProfile} alt={record.user?.full_name!} 
								loading="lazy" className="w-10 h-10 rounded-md overflow-hidden" />
							{record.user?.full_name}
						</p>
						<p className="flex gap-2 items-center">
							<MailOutlined />
							{record.user?.email}
						</p>
					</div>
				</section>
				<section className="flex-1">
					<h2 className="flex gap-2 items-center text-lg text-gray-700 font-semibold border-b border-slate-200 pb-2">
						<EnvironmentOutlined className="w-8 h-8 grid place-content-center rounded-full bg-gray-200" />
						Address
					</h2>
					<div className="flex flex-col gap-1 mt-4">
						<p>{record.address?.name}</p>
						<p>{record.address?.phoneNumber}</p>
						<p>
							{record.address?.address},{" "}
							{record.address?.townLocality}
						</p>
						<p>
							{record.address?.cityDistrict},{" "}
							{record.address?.state}, {record.address?.pincode}
						</p>
					</div>
				</section>
				<section className="flex-1">
					<h2 className="flex gap-2 items-center text-lg text-gray-700 font-semibold border-b border-slate-200 pb-2">
						<CreditCardOutlined className="w-8 h-8 grid place-content-center rounded-full bg-gray-200" />
						Payment Details
					</h2>
					<div className="flex flex-col gap-1 mt-4">
						<p>{record.address?.name}</p>
						<p>{record.address?.phoneNumber}</p>
						<p>
							{record.address?.address},{" "}
							{record.address?.townLocality}
						</p>
						<p>
							{record.address?.cityDistrict},{" "}
							{record.address?.state}, {record.address?.pincode}
						</p>
					</div>
				</section>
			</div>
			<section>
				<h2 className="text-lg text-gray-700 font-semibold">
					Products ordered
				</h2>
				<div className="mt-2 flex flex-col overflow-x-auto">
					<Table columns={columns} data={record.products_ordered} />
					<div className="ml-auto mt-4 max-w-[16rem] w-full flex flex-col gap-2">
						<p className="flex justify-between">
							<span>Sub Total : </span>
							<span>{currencyFormatter(SubTotal)}</span>
						</p>
						<p className="flex justify-between">
							Discount :{" "}
							<span>{currencyFormatter(discount)}</span>
						</p>
						<p className="flex justify-between">
							Shipping charges :{" "}
							<span>{currencyFormatter(shippingCharges)}</span>
						</p>
						<hr className="text-black" />
						<p className="flex justify-between font-bold">
							<span>Total :</span>
							<span>
								{currencyFormatter(
									SubTotal + shippingCharges - discount,
								)}
							</span>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

