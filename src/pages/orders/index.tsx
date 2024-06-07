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
import { useNavigate } from "react-router-dom";
import { openDrawer } from "../../redux/slice/uiActionsSlice";

const Orders = () => {
  const { data, error, status } = useAppSelector(selectOrders);
  const { data: searchData, totalItems } = useAppSelector(selectOrderSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectOrdersCurrentItem);
  const navigate = useNavigate();

  const setCurrentItemFn = (
    action: "read" | "update" | "delete" | "create",
    record: Order | null
  ) => {
    if (action === "create") {
      dispatch(openDrawer());
      return;
    }
    if (record === null) return;
    dispatch(setOrderCurrentItem({ action, record }));
    if (action === "read") {
      navigate(`./${record.id}`);
      return;
    }
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
    search: "order_status",
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
