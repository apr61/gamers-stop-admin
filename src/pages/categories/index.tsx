import { useEffect } from "react";
import CategoriesForm from "../../components/forms/CategoriesForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch } from "../../redux/store/hooks";
import { CrudConfig } from "../../utils/types";
import { fields } from "./config";
import { resetCrudState } from "../../redux/slice/crudSlice";

const Categories = () => {
  const config: CrudConfig = {
    DATA_TABLE_TITLE: "Category list",
    DRAWER_TITLE: "Category",
    ADD_NEW_ITEM: "Add new category",
    TABLE_NAME: "categories",
    fields: fields,
    search: "category_name",
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={CategoriesForm} />;
};

export default Categories;
