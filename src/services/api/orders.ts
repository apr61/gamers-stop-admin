import supabase from "../../utils/supabase";
import { Product, QueryType } from "../../utils/types";

export const searchOrders = async (query: QueryType) => {
  const { count, error: countError } = await supabase.supabase
    .from("orders")
    .select("*", { count: "exact", head: true });
  if (countError) {
    throw new Error(countError.message);
  }
  const { data: orders, error: ordersError } = await supabase.supabase
    .from("orders")
    .select(
      `
      id,
      user_id,
      address_id,
      orderstatus,
      totalprice,
      paymentstatus,
      order_date,
      ordernumber,
      user:profiles (*),
      address: addresses (id, address, name, phoneNumber, pincode, townLocality, cityDistrict, state)
    `
    )
    .ilike(`${query.search.query}`, `%${query.search.with}%`)
    .order("order_date", { ascending: false })
    .range(query.pagination.from, query.pagination.to);

  if (ordersError || orders === null) throw ordersError;

  // Fetch products for each order by querying order_products and products tables
  const orderIds = orders.map((order) => order.id);
  const { data: orderProducts, error: orderProductsError } =
    await supabase.supabase
      .from("order_products")
      .select(
        "order_id, product_id, products (id, name, description, price, quantity, category_id, images)"
      )
      .in("order_id", orderIds);

  if (orderProductsError) throw orderProductsError;

  // Map products to their respective orders
  const ordersWithProducts = orders.map((order) => ({
    ...order,
    products: orderProducts
      .filter((op) => op.order_id === order.id)
      .map((op) => op.products),
  }));

  const response = {
    data: ordersWithProducts ? ordersWithProducts : [],
    count: count ? count : 0,
  };
  return response;
};

const fetchAllOrders = async () => {
  try {
    // Fetch orders with user details and address
    const { data: orders, error: ordersError } = await supabase.supabase.from(
      "orders"
    ).select(`
        id,
        user_id,
        address_id,
        orderstatus,
        totalprice,
        paymentstatus,
        order_date,
        ordernumber,
        user:profiles (*),
        address: addresses (id, address, name, phoneNumber, pincode, townLocality, cityDistrict, state)
      `);
    if (ordersError || orders === null) throw ordersError;

    // Fetch products for each order by querying order_products and products tables
    const orderIds = orders.map((order) => order.id);
    const { data: orderProducts, error: orderProductsError } =
      await supabase.supabase
        .from("order_products")
        .select(
          "order_id, product_id, products (id, name, description, price, quantity, category_id, images)"
        )
        .in("order_id", orderIds);

    if (orderProductsError) throw orderProductsError;

    // Map products to their respective orders
    const ordersWithProducts = orders.map((order) => ({
      ...order,
      products: orderProducts
        .filter((op) => op.order_id === order.id)
        .map((op) => op.products as Product[]),
    }));

    return ordersWithProducts;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export { fetchAllOrders };
