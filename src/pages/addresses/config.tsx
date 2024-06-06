import {
  Address,
  ColumnConfig,
  CustomUser,
  user_role,
} from "../../utils/types";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";
import ReadItem from "../../components/ReadItem";
import { ROLE_COLORS } from "../users/config";

const UserReadItem: ColumnConfig<CustomUser>[] = [
  {
    title: "UserId",
    dataIndex: "id",
  },
  {
    title: "Pic",
    render: (record: CustomUser) => (
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
    title: "Role",
    dataIndex: "user_role",
    render: (record: CustomUser) => (
      <p
        className={`py-1 px-4 rounded-2xl w-fit ${
          ROLE_COLORS[record.user_role as user_role]
        }`}
      >
        {record.user_role}
      </p>
    ),
  },
];

const columns: ColumnConfig<Address>[] = [
  {
    title: "Customer",
    render: (record: Address) => (
      <div className="flex gap-2 items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={
            record?.user.avatar_url ? record?.user.avatar_url : BlankUserProfile
          }
          alt={record?.user.full_name}
        />
        <p>{record.user.full_name}</p>
      </div>
    ),
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

const readItem: ColumnConfig<Address>[] = [
  {
    title: "Name",
    dataIndex: "name",
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
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Town/Locality",
    dataIndex: "townLocality",
  },
  {
    title: "City/District",
    dataIndex: "cityDistrict",
  },
  {
    title: "State",
    dataIndex: "state",
  },
  {
    title: "Pincode",
    dataIndex: "pincode",
  },
  {
    title: "Default",
    dataIndex: "isDefault",
    render: (record: Address) => (record.isDefault ? "Yes" : "No"),
  },
  {
    title: "User Details",
    render: (record: Address) =>
      record?.user ? (
        <ReadItem<CustomUser> record={record.user} readItem={UserReadItem} />
      ) : (
        ""
      ),
  },
];

export { columns, readItem };
