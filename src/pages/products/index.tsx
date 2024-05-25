import { ColumnConfig, CrudConfig, Product } from "../../utils/types";
import CrudLayout from "../../layout/CrudLayout";
import ProductsForm from "../../components/forms/ProductsForm";
import { useEffect } from "react";
import { resetCrudState } from "../../redux/slice/crudSlice";
import { useAppDispatch } from "../../redux/store/hooks";

const Products = () => {
  const columns: ColumnConfig<Product>[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "images",
      render: (record: Product) =>
        record.images && record.images.length > 0 ? (
          <img src={record.images[0]} alt={record.name} className="w-10 h-10" />
        ) : (
          ""
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (record: Product) => `$${record.price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (record: Product) =>
        record && record.category ? record.category!.category_name : "",
    },
  ];
  const config: CrudConfig<Product> = {
    DATA_TABLE_TITLE: "Products list",
    DRAWER_TITLE: "Products",
    ADD_NEW_ITEM: "Add new product",
    TABLE_NAME: "products",
    search: "name",
    columns: columns,
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  
  return <CrudLayout config={config} Form={ProductsForm} />;
};

export default Products;
