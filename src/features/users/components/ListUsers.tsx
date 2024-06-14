import {
  userSearch,
  selectUsers,
  selectUsersSearch,
  selectUserItemsView,
  setUserCurrentItem,
} from "../usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { User, ColumnConfig } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { GridItemsAction, TableActions } from "@/components/ItemActions";
import ItemsGridLayout from "@/components/layouts/ItemsGridLayout";

import BlankUserProfile from "@/assets/blank-profile-picture.webp";
import { ROLE_COLORS } from "@/utils/constants";

const columns: ColumnConfig<User>[] = [
  {
    title: "User",
    render: (record: User) => (
      <div className="flex gap-2 items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={record?.avatar_url ? record?.avatar_url : BlankUserProfile}
          alt={record?.full_name}
        />
        <p>{record.full_name}</p>
      </div>
    ),
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
    title: "Last login",
    dataIndex: "lastLogin",
    render: (record: User) =>
      record.lastLogin
        ? new Date(record.lastLogin).toLocaleDateString()
        : "never",
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
  const itemsView = useAppSelector(selectUserItemsView);

  const handleUpdate = (record: User) => {
    dispatch(setUserCurrentItem({ record: record, action: "update" }));
  };
  const handleRead = (record: User) => {
    dispatch(setUserCurrentItem({ record: record, action: "read" }));
  };

  const tableColumns: ColumnConfig<User>[] = [
    ...columns,
    {
      title: "Actions",
      render: (record: User) => (
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
      {itemsView === "LIST" ? (
        <div className="bg-white">
          <Table columns={tableColumns} data={data as User[]} />
        </div>
      ) : (
        <UserGridView
          data={data}
          editFn={handleUpdate}
          readFn={handleRead}
          allowedActions={["UPDATE", "READ"]}
        />
      )}
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

type UserGridViewProps = {
  data: User[];
  readFn?: (record: User) => void;
  editFn?: (record: User) => void;
  deleteFn?: (record: User) => void;
  allowedActions?: ("READ" | "UPDATE" | "DELETE")[];
};

const UserGridView = ({ data, ...props }: UserGridViewProps) => {
  return (
    <ItemsGridLayout>
      {data.map((user) => (
        <GridItemsAction key={user.id} record={user} {...props}>
          <div className="mt-6 flex gap-2 flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={user.avatar_url ? user.avatar_url : BlankUserProfile}
                className="w-full h-full object-cover"
                loading="lazy"
                alt={user.full_name}
              />
            </div>
            <h2 className="text-xl font-semibold">{user.full_name}</h2>
            <p>{user.email}</p>
            <p>+91-{user.phone}</p>
            <p
              className={`py-1 px-4 rounded-2xl w-fit ${
                ROLE_COLORS[user.user_role]
              }`}
            >
              {user.user_role}
            </p>
          </div>
        </GridItemsAction>
      ))}
    </ItemsGridLayout>
  );
};
