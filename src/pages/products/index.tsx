import { CrudConfig } from '../../utils/types';
import CrudLayout from '../../layout/CrudLayout';
import ProductsForm from '../../components/forms/ProductsForm';
import { fields } from './config';

const Products = () => {
  const config : CrudConfig = {
    DATA_TABLE_TITLE : "Products list",
    DRAWER_TITLE : "Products",
    ADD_NEW_ITEM : "Add new products",
    TABLE_NAME : "products",
    fields: fields,
    search: "name"
  };
  return <CrudLayout config={config} Form={ProductsForm} />;
}

export default Products