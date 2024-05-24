import { useEffect } from "react";
import CategoriesForm from "../../components/forms/CategoriesForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch } from "../../redux/store/hooks";
import { Category, CrudConfig, ColumnConfig } from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";

const Categories = () => {
  const columns: ColumnConfig<Category>[] = [
    {
      title: "Name",
      dataIndex: "category_name",
    },
    {
      title: "Image",
      dataIndex: "category_image",
      render: (record: Category) => (
        <img
          src={record.category_image}
          alt={record.category_name}
          className="w-10 h-10"
        />
      ),
    },
  ];
  const config: CrudConfig<Category> = {
    DATA_TABLE_TITLE: "Category list",
    DRAWER_TITLE: "Category",
    ADD_NEW_ITEM: "Add new category",
    TABLE_NAME: "categories",
    search: "category_name",
    columns: columns,
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={CategoriesForm} />;
};

export default Categories;
