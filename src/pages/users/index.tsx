import { useEffect } from "react";
import UserForm from "../../components/forms/UserForm";
import CrudLayout from "../../layout/CrudLayout";
import { resetCrudState } from "../../redux/slice/crudSlice";
import { CrudConfig, User } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  resetUserState,
  selectUserCurrentItem,
  selectUsers,
  selectUsersSearch,
  setUserCurrentItem,
  userSearch,
} from "../../redux/slice/usersSlice";
import { columns, readItem } from "./config";

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
    record: User
  ) => {
    dispatch(setUserCurrentItem({ action, record }));
  };

  const searchFn = () => {
    dispatch(userSearch());
  };

  const deleteFn = async (record: User) => {};

  const resetEntityStateFn = () => {
    dispatch(resetUserState());
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
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={UserForm} />;
};

export default Users;
