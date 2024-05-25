import { useEffect } from "react";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch } from "../../redux/store/hooks";
import { CrudConfig, ColumnConfig, Address } from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";
import AddressForm from "../../components/forms/AddressForm";
import BlankUserProfile from "../../assets/blank-profile-picture.webp"

const Addresses = () => {
  const columns: ColumnConfig<Address>[] = [
    {
      title: "Pic",
      render: (record: Address) => (
        <img
          className="w-10 h-10 rounded-full"
          src={
            record?.user.avatar_url ? record?.user.avatar_url : BlankUserProfile
          }
          alt={record?.user.full_name}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Default",
      dataIndex: "isDefault",
      render: (record: Address) => (record.isDefault ? "Yes" : "No"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (record: Address) =>
        new Date(record.created_at).toLocaleDateString(),
    },
    {
      title: "User Id",
      render: (record: Address) => record?.user.id.substring(0, 10),
    },
  ];
  const config: CrudConfig<Address> = {
    DATA_TABLE_TITLE: "Address list",
    DRAWER_TITLE: "Address",
    ADD_NEW_ITEM: "Add new address",
    TABLE_NAME: "addresses",
    search: "name",
    columns: columns,
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCrudState());
  }, [dispatch]);
  return <CrudLayout config={config} Form={AddressForm} />;
};

export default Addresses;
