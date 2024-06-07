import supabase from "../../utils/supabase";
import { CustomUser, Order, ProductsOrdered } from "../../utils/types";

const getRecentOrders = async (): Promise<Order[]> => {
	const { data: orders, error: ordersError } = await supabase.supabase
		.from("orders")
		.select(
			`
	  id,
	  user_id,
	  address_id,
	  order_status,
	  total_price,
	  payment_status,
	  order_date,
	  order_number,
	  user:profiles (full_name, id, avatar_url, user_role, email, phone),
	  address: addresses (id, address, name, phoneNumber, pincode, townLocality, cityDistrict, state)
	`,
		)
		.order("order_date", { ascending: false })
		.limit(5);

	if (ordersError || orders === null) throw ordersError;

	// Fetch products for each order by querying order_products and products tables
	const orderIds = orders.map((order) => order.id);
	const { data: orderProducts, error: orderProductsError } =
		await supabase.supabase
			.from("order_products")
			.select(
				"order_id, quantity, product: products (id, name, description, price,created_at, quantity, images, category_id, category:categories(*), brand:brands(id, brand_name))",
			)
			.in("order_id", orderIds);

	if (orderProductsError) throw orderProductsError;

	// Map products to their respective orders
	const ordersWithProducts = orders.map((order) => {
		const currentOrder = orderProducts.filter(
			(op) => op.order_id === order.id,
		);
		return {
			...order,
			products_ordered: currentOrder.map((product) => ({
				product: product.product,
				quantity_ordered: product.quantity,
			})),
		};
	});
	return ordersWithProducts;
};

const getRecentProfiles = async () => {
	try {
		const { data, error } = await supabase.supabase
			.from("profiles")
			.select("*")
			.order("created_at", { ascending: false })
			.limit(5);

		if (error) throw error;

		return data as CustomUser[];
	} catch (error) {
		console.error("Error fetching profiles:", error);
		throw error;
	}
};

const getTopSellingProducts = async (): Promise<any> => {
	const { data, error } = await supabase.supabase
		.from("orders")
		.select("products_ordered")
		.eq("order_status", "delivered");

	if (error) throw error;

	const productQuantities: Record<string, number> = {};

	data.forEach((order) => {
		order.products_ordered.forEach((product) => {
			if (product) {
				const productId = product["id"];
				const productQuantity = product["quantity"];
				if (productId in productQuantities) {
					productQuantities[productId] += productQuantity;
				} else {
					productQuantities[productId] = productQuantity;
				}
			}
		});
	});
	const productIds = Object.keys(productQuantities);
	const { data: productData, error : perror } = await supabase.supabase
	  .from("products")
	  .select("*, category:categories(*), brand:brands(id, brand_name)")
		.in("id", productIds)
	if(perror) throw perror;
	return productData;
};

export { getRecentOrders, getRecentProfiles, getTopSellingProducts };
