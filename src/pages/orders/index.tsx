import { useEffect } from "react";
import OrderForm from "../../components/forms/OrderForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CrudConfig, Order, ColumnConfig, QueryType } from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";
import {
  orderSearch,
  removeOrder,
  resetOrderCurrentItem,
  selectOrderSearch,
  selectOrders,
  selectOrdersCurrentItem,
  setOrderCurrentItem,
} from "../../redux/slice/ordersSlice";

const Orders = () => {
  const { data, error, status } = useAppSelector(selectOrders);
  const { data: searchData, totalItems } = useAppSelector(selectOrderSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectOrdersCurrentItem);
  const columns: ColumnConfig<Order>[] = [
    {
      title: "Order Number",
      dataIndex: "ordernumber",
    },
    {
      title: "Name",
      render: (record: Order) => (record.user ? record?.user.full_name : ""),
    },
    {
      title: "Total Price",
      dataIndex: "totalprice",
      render: (record: Order) => `$${record.totalprice}`,
    },
    {
      title: "Order Status",
      dataIndex: "orderstatus",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      render: (record: Order) =>
        new Date(record.order_date).toLocaleDateString(),
    },
  ];
  const setCurrentItemFn = (
    action: "read" | "update" | "delete",
    record: Order
  ) => {
    dispatch(setOrderCurrentItem({ action, record }));
  };

  const searchFn = (query: QueryType<Order>) => {
    dispatch(orderSearch(query));
  };

  const deleteFn = async (record: Order) => {
    await dispatch(removeOrder(record.id));
  };

  const resetEntityStateFn = () => {
    dispatch(resetOrderCurrentItem());
  };

  const config: CrudConfig<Order> = {
    DATA_TABLE_TITLE: "Order list",
    DRAWER_TITLE: "Order",
    ADD_NEW_ITEM: "Add new order",
    TABLE_NAME: "orders",
    search: "orderstatus",
    columns: columns,
    entity: {
      entityData: {
        data,
        search: { data: searchData, totalItems },
        status,
        error,
      },
      current: {
        action,
        record: record,
        error: currentError,
        status: currentStatus,
      },
      searchFn,
      deleteFn,
      resetEntityStateFn,
      setCurrentItemFn,
    },
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);

  return <CrudLayout config={config} Form={OrderForm} />;
};

export default Orders;
