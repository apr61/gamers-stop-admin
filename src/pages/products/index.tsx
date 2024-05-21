import { CrudConfig } from "../../utils/types";
import CrudLayout from "../../layout/CrudLayout";
import ProductsForm from "../../components/forms/ProductsForm";
import { fields } from "./config";
import { useEffect } from "react";
import { resetCrudState } from "../../redux/slice/crudSlice";
import { useAppDispatch } from "../../redux/store/hooks";

const Products = () => {
  const config: CrudConfig = {
    DATA_TABLE_TITLE: "Products list",
    DRAWER_TITLE: "Products",
    ADD_NEW_ITEM: "Add new product",
    TABLE_NAME: "products",
    fields: fields,
    search: "name",
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={ProductsForm} />;
};

export default Products;
