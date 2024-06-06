import { useEffect } from "react";
import CategoriesForm from "../../components/forms/CategoriesForm";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Category, CrudConfig, QueryType } from "../../utils/types";
import {
  categorySearch,
  removeCategory,
  resetCategoryCurrentItem,
  selectCategories,
  selectCategoriesSearch,
  selectCategoryCurrentItem,
  setCategoryCurrentItem,
} from "../../redux/slice/categorySlice";
import { columns, readItem } from "./config";
import { openDrawer } from "../../redux/slice/uiActionsSlice";

const Categories = () => {
  const { data, error, status } = useAppSelector(selectCategories);
  const { data: searchData, totalItems } = useAppSelector(
    selectCategoriesSearch,
  );
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectCategoryCurrentItem);

  const setCurrentItemFn = (
    action: "read" | "update" | "delete",
    record: Category,
  ) => {
    dispatch(setCategoryCurrentItem({ action, record }));
    dispatch(openDrawer());
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
    dispatch(resetCategoryCurrentItem());
  }, [dispatch]);
  return <CrudLayout config={config} Form={CategoriesForm} />;
};

export default Categories;
