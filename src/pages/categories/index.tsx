import { useEffect } from "react";
import CategoriesForm from "../../components/forms/CategoriesForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  Category,
  CrudConfig,
  ColumnConfig,
  QueryType,
} from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";
import {
  categorySearch,
  removeCategory,
  resetCategoryCurrentItem,
  selectCategories,
  selectCategoriesSearch,
  selectCategoryCurrentItem,
  setCategoryCurrentItem,
} from "../../redux/slice/categorySlice";

const Categories = () => {
  const { data, error, status } = useAppSelector(selectCategories);
  const { data: searchData, totalItems } = useAppSelector(
    selectCategoriesSearch
  );
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectCategoryCurrentItem);

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

  const setCurrentItemFn = (
    action: "read" | "update" | "delete",
    record: Category
  ) => {
    dispatch(setCategoryCurrentItem({ action, record }));
  };

  const searchFn = (query: QueryType<Category>) => {
    dispatch(categorySearch(query));
  };

  const deleteFn = async (record: Category) => {
    await dispatch(removeCategory(record.id));
  };

  const resetEntityStateFn = () => {
    dispatch(resetCategoryCurrentItem());
  };

  const config: CrudConfig<Category> = {
    DATA_TABLE_TITLE: "Category list",
    DRAWER_TITLE: "Category",
    ADD_NEW_ITEM: "Add new category",
    TABLE_NAME: "categories",
    search: "category_name",
    columns: columns,
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
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={CategoriesForm} />;
};

export default Categories;
