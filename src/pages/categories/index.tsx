import CrudLayout from "../../layout/CrudLayout";
import { CrudConfig } from "../../utils/types";

const Categories = () => {
  const config : CrudConfig = {
    DATA_TABLE_TITLE : "Category list",
    DRAWER_TITLE : "Category",
    ADD_NEW_ITEM : "Add new category",
    TABLE_NAME : "categories"
  };
  return <CrudLayout config={config} />;
};

export default Categories;
