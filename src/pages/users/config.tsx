import { ColumnConfig, User } from "../../utils/types";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";
const ROLE_COLORS = {
  ADMIN: "bg-blue-200",
  USER: "bg-green-200",
};

const columns: ColumnConfig<User>[] = [
  {
    title: "Customer",
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
    title: "Mobile Number",
    dataIndex: "phone",
  },
  {
    title: "Last login",
    dataIndex: "lastLogin",
    render: (record: User) => record.lastLogin ? new Date(record.lastLogin).toLocaleDateString() : "never",
  },
];

const readItem: ColumnConfig<User>[] = [
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
    render: (record: User) => new Date(record.created_at).toLocaleDateString(),
  },
];

export { columns, readItem, ROLE_COLORS };
