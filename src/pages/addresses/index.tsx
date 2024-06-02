import { useEffect } from "react";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  CrudConfig,
  ColumnConfig,
  Address,
  QueryType,
} from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";
import AddressForm from "../../components/forms/AddressForm";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";
import {
  addressSearch,
  removeAddress,
  resetAddressCurrentItem,
  selectAddressCurrentItem,
  selectAddressSearch,
  selectAddresses,
  setAddressCurrentItem,
} from "../../redux/slice/addressSlice";

const Addresses = () => {
  const { data, error, status } = useAppSelector(selectAddresses);
  const { data: searchData, totalItems } = useAppSelector(selectAddressSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectAddressCurrentItem);
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
  const setCurrentItemFn = (
    action: "read" | "update" | "delete",
    record: Address
  ) => {
    dispatch(setAddressCurrentItem({ action, record }));
  };

  const searchFn = (query: QueryType<Address>) => {
    dispatch(addressSearch(query));
  };

  const deleteFn = async (record: Address) => {
    await dispatch(removeAddress(record.id));
  };

  const resetEntityStateFn = () => {
    dispatch(resetAddressCurrentItem());
  };
  const config: CrudConfig<Address> = {
    DATA_TABLE_TITLE: "Address list",
    DRAWER_TITLE: "Address",
    ADD_NEW_ITEM: "Add new address",
    TABLE_NAME: "addresses",
    search: "name",
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
  return <CrudLayout config={config} Form={AddressForm} />;
};

export default Addresses;
