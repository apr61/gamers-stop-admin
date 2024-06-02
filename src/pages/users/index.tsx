import { useEffect } from "react";
import UserForm from "../../components/forms/UserForm";
import CrudLayout from "../../layout/CrudLayout";
import { resetCrudState } from "../../redux/slice/crudSlice";
import { ColumnConfig, CrudConfig, User } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";
import {
  resetUserState,
  selectUserCurrentItem,
  selectUsers,
  selectUsersSearch,
  setUserCurrentItem,
  userSearch,
} from "../../redux/slice/usersSlice";

const ROLE_COLORS = {
  ADMIN: "bg-blue-200",
  USER: "bg-green-200",
};

const Users = () => {
  const { data, error, status } = useAppSelector(selectUsers);
  const { data: searchData, totalItems } = useAppSelector(selectUsersSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectUserCurrentItem);
  const columns: ColumnConfig<User>[] = [
    {
      title: "Pic",
      render: (record: User) => (
        <img
          className="w-10 h-10 rounded-full"
          src={record.avatar_url ? record.avatar_url : BlankUserProfile}
          alt={record.full_name}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "user_role",
      render: (record: User) => (
        <p
          className={`py-1 px-4 rounded-2xl w-fit ${
            ROLE_COLORS[record.user_role]
          }`}
        >
          {record.user_role}
        </p>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "phone",
    },
    {
      title: "Last login",
      dataIndex: "lastLogin",
      render: (record: User) => new Date(record.lastLogin).toLocaleDateString(),
    },
    {
      title: "Last Updated",
      dataIndex: "last_updated",
      render: (record: User) =>
        new Date(record.last_updated).toLocaleDateString(),
    },
    {
      title: "Member Since",
      dataIndex: "created_at",
      render: (record: User) =>
        new Date(record.created_at).toLocaleDateString(),
    },
  ];
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
