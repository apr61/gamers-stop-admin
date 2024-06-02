import supabase from "../../utils/supabase";
import { Order, QueryType } from "../../utils/types";

const searchOrders = async (query: QueryType<Order>) => {
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
      quantity,
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
        "order_id, product_id, products (id, name, description, price, quantity, category_id, images, category:categories(*))"
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

const updateOrder = async (
  orderId: number,
  updatedOrder: any
): Promise<Order | null> => {
  const { data, error } = await supabase.supabase
    .from("orders")
    .update(updatedOrder)
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error updating order:", error.message);
    return null;
  }

  return data;
};

const deleteOrder = async (orderId: number): Promise<number> => {
  const { error } = await supabase.supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    console.error("Error deleting order:", error.message);
  }

  return orderId;
};

const createOrder = async (order: any): Promise<Order | null> => {
  const { data, error } = await supabase.supabase
    .from("orders")
    .insert([order])
    .single();

  if (error) {
    console.error("Error creating order:", error.message);
    return null;
  }

  return data;
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
        .map((op) => op.products),
    }));

    return ordersWithProducts;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

const getOrders = async (): Promise<any> => {
  const { data, error } = await supabase.supabase.from("orders").select(`
      id,
      user_id,
      address_id,
      product_ids,
      order_date,
      orderStatus,
      totalPrice,
      orderNumber,
      paymentStatus,
      users:auth.users (id, email, full_name),
      addresses (id, address, name, phoneNumber, pincode, townLocality, cityDistrict, state),
      order_products (
        product_id,
        products (id, name, description, price, quantity, category_id, images)
      )
    `);

  if (error) {
    console.error("Error fetching orders:", error.message);
    return null;
  }

  return data;
};

const getOrdersByUserId = async (userId: string) => {
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
      quantity,
      user:profiles (*),
      address: addresses (id, address, name, phoneNumber, pincode, townLocality, cityDistrict, state)
    `
    )
    .eq("user_id", userId);

  if (ordersError || orders === null) throw ordersError;

  // Fetch products for each order by querying order_products and products tables
  const orderIds = orders.map((order) => order.id);
  const { data: orderProducts, error: orderProductsError } =
    await supabase.supabase
      .from("order_products")
      .select(
        "order_id, product_id, products (id, name, description, price, quantity, category_id, images, category:categories(*))"
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
  return {
    data: ordersWithProducts,
    totalItems : ordersWithProducts.length
  }
};

export {
  fetchAllOrders,
  updateOrder,
  searchOrders,
  deleteOrder,
  createOrder,
  getOrders,
  getOrdersByUserId
};
