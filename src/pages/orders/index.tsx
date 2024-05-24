import { useEffect } from "react";
import OrderForm from "../../components/forms/OrderForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch } from "../../redux/store/hooks";
import { CrudConfig, Order, ColumnConfig } from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";

const Orders = () => {
  const columns: ColumnConfig<Order>[] = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      render: (record: Order) =>
        record.orderNumber ? record.orderNumber.substring(0, 10) : "",
    },
    {
      title: "Customer name",
      dataIndex: "userId",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (record: Order) => `$${record.totalPrice}`,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
    },
    {
      title: "Order Date",
      dataIndex: "created_at",
      render: (record: Order) =>
        new Date(record.created_at).toLocaleDateString(),
    },
  ];
  const config: CrudConfig<Order> = {
    DATA_TABLE_TITLE: "Orders list",
    DRAWER_TITLE: "Order",
    ADD_NEW_ITEM: "Add new order",
    TABLE_NAME: "orders",
    search: "orderStatus",
    columns: columns,
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={OrderForm} />;
};

export default Orders;
