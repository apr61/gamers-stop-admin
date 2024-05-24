import { useEffect } from "react";
import UserForm from "../../components/forms/UserForm";
import CrudLayout from "../../layout/CrudLayout";
import { resetCrudState } from "../../redux/slice/crudSlice";
import { CrudConfig } from "../../utils/types";
import { useAppDispatch } from "../../redux/store/hooks";
import { User } from "@supabase/supabase-js";
import { listAllUsers } from "../../services/api/users";

const Users = () => {
  const config: CrudConfig<User> = {
    DATA_TABLE_TITLE: "Users list",
    DRAWER_TITLE: "User",
    ADD_NEW_ITEM: "Add new user",
    TABLE_NAME: "users",
    search: "",
    columns: [],
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={UserForm} />;
};

export default Users;
