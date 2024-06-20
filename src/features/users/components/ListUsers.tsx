import {
  userSearch,
  selectUsers,
  selectUsersSearch,
  setUserCurrentItem,
} from "../usersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { CustomUser, ColumnConfig } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { TableActions } from "@/components/ItemActions";

import BlankUserProfile from "@/assets/blank-profile-picture.webp";
import { ROLE_COLORS } from "@/utils/constants";

const columns: ColumnConfig<CustomUser>[] = [
  {
    title: "Avatar",
    render: (record: CustomUser) => (
      <div className="flex gap-2 items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={record?.avatar_url ? record?.avatar_url : BlankUserProfile}
          alt={record?.full_name || ""}
        />
      </div>
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
    render: (record: CustomUser) => (
      <p
        className={`py-1 px-4 rounded-2xl w-fit ${
          ROLE_COLORS[record.user_role]
        }`}
      >
        {record.user_role}
      </p>
    ),
  },
];

const ListUsers = () => {
  const { data, totalItems } = useAppSelector(selectUsersSearch);
  const { status, error } = useAppSelector(selectUsers);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const dispatch = useAppDispatch();

  const handleUpdate = (record: CustomUser) => {
    dispatch(setUserCurrentItem({ record: record, action: "update" }));
  };
  const handleRead = (record: CustomUser) => {
    dispatch(setUserCurrentItem({ record: record, action: "read" }));
  };

  const tableColumns: ColumnConfig<CustomUser>[] = [
    ...columns,
    {
      title: "Actions",
      render: (record: CustomUser) => (
        <TableActions
          record={record}
          readFn={handleRead}
          editFn={handleUpdate}
          allowedActions={["UPDATE", "READ"]}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(userSearch());
  }, []);

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-2">
      <div className="">
        <Table columns={tableColumns} data={data as CustomUser[]} />
      </div>

      <div className="flex w-full mt-4 justify-between">
        <p>
          Page {+page} of {totalPages}
        </p>
        <Pagination
          currentPage={+page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ListUsers;
