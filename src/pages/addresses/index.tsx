import { useEffect } from "react";
import CrudLayout from "../../layout/CrudLayout";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CrudConfig, Address, QueryType } from "../../utils/types";
import { resetCrudState } from "../../redux/slice/crudSlice";
import AddressForm from "../../components/forms/AddressForm";
import {
  addressSearch,
  removeAddress,
  resetAddressCurrentItem,
  selectAddressCurrentItem,
  selectAddressSearch,
  selectAddresses,
  setAddressCurrentItem,
} from "../../redux/slice/addressSlice";
import { columns, readItem } from "./config";

const Addresses = () => {
  const { data, error, status } = useAppSelector(selectAddresses);
  const { data: searchData, totalItems } = useAppSelector(selectAddressSearch);
  const {
    record,
    error: currentError,
    status: currentStatus,
    action,
  } = useAppSelector(selectAddressCurrentItem);

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
  return <CrudLayout config={config} Form={AddressForm} />;
};

export default Addresses;
