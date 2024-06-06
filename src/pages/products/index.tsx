import { CrudConfig, Product, QueryType } from "../../utils/types";
import CrudLayout from "../../layout/CrudLayout";
import ProductsForm from "../../components/forms/ProductsForm";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  productSearch,
  removeProduct,
  resetProductCurrentItem,
  selectProdcutsCurrentItem,
  selectProducts,
  selectProductsSearch,
  setProductCurrentItem,
} from "../../redux/slice/productsSlice";
import { columns, readItem } from "./config";
import { openDrawer } from "../../redux/slice/uiActionsSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { data, error, status } = useAppSelector(selectProducts);
  const { data: searchData, totalItems } = useAppSelector(selectProductsSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectProdcutsCurrentItem);
  const navigate = useNavigate();
  const setCurrentItemFn = (
    action: "read" | "update" | "delete",
    record: Product,
  ) => {
    dispatch(setProductCurrentItem({ action, record }));
    if (action === "read") {
      navigate(`./${record.id}`);
      return;
    }
  };

  const searchFn = (query: QueryType<Product>) => {
    dispatch(productSearch(query));
  };

  const deleteFn = async (record: Product) => {
    await dispatch(removeProduct(record.id));
  };

  const resetEntityStateFn = () => {
    dispatch(resetProductCurrentItem());
  };
  const config: CrudConfig<Product> = {
    DATA_TABLE_TITLE: "Products list",
    DRAWER_TITLE: "Products",
    ADD_NEW_ITEM: "Add new product",
    TABLE_NAME: "products",
    search: "name",
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
    dispatch(resetProductCurrentItem());
  }, [dispatch]);

  return <CrudLayout config={config} Form={ProductsForm} />;
};

export default Products;
