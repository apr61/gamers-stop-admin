import supabase from "../../utils/supabase";
import { Order, OrderFormValues, QueryType } from "../../utils/types";

const searchOrders = async (
  query: QueryType<Order>
): Promise<{ data: Order[]; count: number }> => {
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
      order_status,
      total_price,
      payment_status,
      order_date,
      order_number,
      user:profiles (full_name, id, avatar_url, user_role, email, phone),
      address: addresses (id, address, name, phoneNumber, pincode, townLocality, cityDistrict, state)
    `
    )
    .ilike(`${query.search.query}`, `%${query.search.with}%`)
    .order("order_date", { ascending: false })
    .range(query.pagination.from, query.pagination.to);

  if (ordersError) throw ordersError;

  // Fetch products for each order by querying order_products and products tables
  const orderIds = orders.map((order) => order.id);
  const { data: orderProducts, error: orderProductsError } =
    await supabase.supabase
      .from("order_products")
      .select(
        "order_id, quantity, product: products (id, name, description, price, quantity, images, category_id, category:categories(*), brand:brands(id, brand_name))"
      )
      .in("order_id", orderIds);

  if (orderProductsError) throw orderProductsError;

  // Map products to their respective orders
  const ordersWithProducts = orders.map((order) => {
    const currentOrder = orderProducts.filter((op) => op.order_id === order.id);
    return {
      ...order,
      products_ordered: currentOrder.map((product) => ({
        product: product.product,
        quantity_ordered: product.quantity,
      })),
    };
  });

  return {
    data: ordersWithProducts,
    count: count ? count : 0,
  };
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

const createOrder = async (order: OrderFormValues): Promise<Order | null> => {
  const { data, error } = await supabase.supabase
    .from("orders")
    .insert([order])
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
  `
    )
    .single();

  if (error) {
    console.error("Error creating order:", error.message);
    return null;
  }

  const { data: orderProducts, error: orderProductsError } =
    await supabase.supabase
      .from("order_products")
      .select(
        "order_id, quantity, product: products (id, name, description, price, quantity, images, category_id, category:categories(*), brand:brands(id, brand_name))"
      )
      .eq("order_id", data.id);

  if (orderProductsError) throw orderProductsError;

  // Map products to their respective orders
  const currentOrder = orderProducts.filter((op) => op.order_id === data.id);
  const ordersWithProducts = {
    ...data,
    products_ordered: currentOrder.map((product) => ({
      product: product.product,
      quantity_ordered: product.quantity,
    })),
  };

  return ordersWithProducts;
};

const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    // Fetch orders with user details and address
    const { data: orders, error: ordersError } = await supabase.supabase.from(
      "orders"
    ).select(`
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
      `);
    if (ordersError || orders === null) throw ordersError;

    // Fetch products for each order by querying order_products and products tables
    const orderIds = orders.map((order) => order.id);
    const { data: orderProducts, error: orderProductsError } =
      await supabase.supabase
        .from("order_products")
        .select(
          "order_id, quantity, product: products (id, name, description, price, quantity, images, category_id, category:categories(*), brand:brands(id, brand_name))"
        )
        .in("order_id", orderIds);

    if (orderProductsError) throw orderProductsError;

    // Map products to their respective orders
    const ordersWithProducts = orders.map((order) => {
      const currentOrder = orderProducts.filter(
        (op) => op.order_id === order.id
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
      order_date,
      orderStatus,
      totalPrice,
      ordernumber,
      paymentstatus,
      users:profiles (id, email, full_name),
      addresses (id, address, name, phoneNumber, pincode, townLocality, cityDistrict, state),
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
      order_status,
      total_price,
      payment_status,
      order_date,
      order_number,
      user:profiles (full_name, id, avatar_url, user_role, email, phone),
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
        "order_id, quantity, product: products (id, name, description, price, quantity, images, category_id, category:categories(*), brand:brands(id, brand_name))"
      )
      .in("order_id", orderIds);

  if (orderProductsError) throw orderProductsError;

  // Map products to their respective orders
  const ordersWithProducts = orders.map((order) => {
    const currentOrder = orderProducts.filter((op) => op.order_id === order.id);
    return {
      ...order,
      products_ordered: currentOrder.map((product) => ({
        product: product.product,
        quantity_ordered: product.quantity,
      })),
    };
  });
  return {
    data: ordersWithProducts,
    totalItems: ordersWithProducts.length,
  };
};

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
    `
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
        "order_id, quantity, product: products (id, name, description, price, quantity, images, category_id, category:categories(*), brand:brands(id, brand_name))"
      )
      .in("order_id", orderIds);

  if (orderProductsError) throw orderProductsError;

  // Map products to their respective orders
  const ordersWithProducts = orders.map((order) => {
    const currentOrder = orderProducts.filter((op) => op.order_id === order.id);
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

export {
  fetchAllOrders,
  updateOrder,
  searchOrders,
  deleteOrder,
  createOrder,
  getOrders,
  getOrdersByUserId,
  getRecentOrders,
};
