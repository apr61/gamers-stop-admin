import { useEffect } from "react";
import UserForm from "../../components/forms/UserForm";
import CrudLayout from "../../layout/CrudLayout";
import { resetCrudState } from "../../redux/slice/crudSlice";
import { CrudConfig } from "../../utils/types";
import { useAppDispatch } from "../../redux/store/hooks";

const Users = () => {
  const config: CrudConfig = {
    DATA_TABLE_TITLE: "Users list",
    DRAWER_TITLE: "User",
    ADD_NEW_ITEM: "Add new user",
    TABLE_NAME: "users",
    fields: {},
    search: "",
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={UserForm} />;
};

export default Users;
