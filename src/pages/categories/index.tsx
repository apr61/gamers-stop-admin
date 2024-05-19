import CategoriesForm from "../../components/forms/CategoriesForm";
import CrudLayout from "../../layout/CrudLayout";
import { CrudConfig } from "../../utils/types";
import { fields } from "./config";

const Categories = () => {
  const config : CrudConfig = {
    DATA_TABLE_TITLE : "Category list",
    DRAWER_TITLE : "Category",
    ADD_NEW_ITEM : "Add new category",
    TABLE_NAME : "categories",
    fields: fields,
    search: "category_name"
  };
  return <CrudLayout config={config} Form={CategoriesForm} />;
};

export default Categories;
