import { useEffect } from "react";
import OrderForm from "../../components/forms/OrderForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch } from "../../redux/store/hooks";
import { CrudConfig } from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";
import { fields } from "./config";

const Orders = () => {
  const config: CrudConfig = {
    DATA_TABLE_TITLE: "Orders list",
    DRAWER_TITLE: "Order",
    ADD_NEW_ITEM: "Add new order",
    TABLE_NAME: "orders",
    fields: fields,
    search: "orderStatus",
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={OrderForm} />;
};

export default Orders;
