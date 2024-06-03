import { useEffect } from "react";
import OrderForm from "../../components/forms/OrderForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CrudConfig, Order, QueryType } from "../../utils/types";
import {
  orderSearch,
  removeOrder,
  resetOrderCurrentItem,
  selectOrderSearch,
  selectOrders,
  selectOrdersCurrentItem,
  setOrderCurrentItem,
} from "../../redux/slice/ordersSlice";
import { columns, readItem } from "./config";

const Orders = () => {
  const { data, error, status } = useAppSelector(selectOrders);
  const { data: searchData, totalItems } = useAppSelector(selectOrderSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectOrdersCurrentItem);

  const setCurrentItemFn = (
    action: "read" | "update" | "delete",
    record: Order,
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
    readItem: readItem,
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
    dispatch(resetOrderCurrentItem());
  }, [dispatch]);

  return <CrudLayout config={config} Form={OrderForm} />;
};

export default Orders;
