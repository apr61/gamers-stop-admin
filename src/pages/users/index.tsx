import { useEffect } from "react";
import UserForm from "../../components/forms/UserForm";
import CrudLayout from "../../layout/CrudLayout";
import { CrudConfig, User } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  resetUserCurrentItem,
  selectUserCurrentItem,
  selectUsers,
  selectUsersSearch,
  setUserCurrentItem,
  userSearch,
} from "../../redux/slice/usersSlice";
import { columns, readItem } from "./config";
import { openDrawer } from "../../redux/slice/uiActionsSlice";

const Users = () => {
  const { data, error, status } = useAppSelector(selectUsers);
  const { data: searchData, totalItems } = useAppSelector(selectUsersSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectUserCurrentItem);

  const setCurrentItemFn = (
    action: "read" | "update" | "delete",
    record: User,
  ) => {
    dispatch(setUserCurrentItem({ action, record }));
    dispatch(openDrawer());
  };

  const searchFn = () => {
    dispatch(userSearch());
  };

  const deleteFn = async (record: User) => {};

  const resetEntityStateFn = () => {
    dispatch(resetUserCurrentItem());
  };
  const config: CrudConfig<User> = {
    DATA_TABLE_TITLE: "Users list",
    DRAWER_TITLE: "User",
    ADD_NEW_ITEM: "Add new user",
    TABLE_NAME: "users",
    search: "full_name",
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
    dispatch(resetUserCurrentItem());
  }, [dispatch]);
  return <CrudLayout config={config} Form={UserForm} />;
};

export default Users;
