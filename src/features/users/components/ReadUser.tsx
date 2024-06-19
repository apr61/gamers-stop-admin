import { useDispatch } from "react-redux";
import { resetUserCurrentItem, selectUserCurrentItem } from "../usersSlice";
import { useAppSelector } from "@/store/hooks";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useEffect } from "react";
import Drawer from "@/components/ui/Drawer";
import BlankUserProfile from "@/assets/blank-profile-picture.webp";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ROLE_COLORS } from "@/utils/constants";
import { CustomUser } from "@/types/api";

const ReadUser = () => {
  const { record, action } = useAppSelector(selectUserCurrentItem);
  const dispatch = useDispatch();
  const { isOpen, open, close } = useDisclosure();

  const handleClose = () => {
    close();
    dispatch(resetUserCurrentItem());
  };

  useEffect(() => {
    if (action === "read") {
      open();
    }
  }, [action]);
  if (record === null) return;
  return (
    <Drawer
      isDrawerOpen={isOpen}
      closeDrawer={handleClose}
      title="User"
      className="bg-background max-w-[35rem]"
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex gap-4 self-start">
          <div className="w-24 h-24">
            <img
              className="w-full h-full rounded-full"
              src={record.avatar_url ? record.avatar_url : BlankUserProfile}
              alt={record.full_name || ""}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{record.full_name}</h2>
            <p className="flex gap-2">
              <MailOutlined />
              {record.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start self-start bg-dimBlack p-4 w-full rounded-md mt-8">
          <div className="grid gap-2 grid-cols-[1.25rem_1fr] border-b border-border pb-4 w-full">
            <div>
              <UserOutlined />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">User role</h4>
              <div
                className={`py-1 px-4 rounded-2xl w-fit ${
                  ROLE_COLORS[record.user_role]
                }`}
              >
                {record.user_role}
              </div>
            </div>
          </div>
          <div className="grid gap-2 grid-cols-[1.25rem_1fr] border-b border-border pb-4 w-full">
            <div>
              <EnvironmentOutlined />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">Addresses</h4>
              <UserAddressList record={record} />
            </div>
          </div>
          <div className="grid gap-2 grid-cols-[1.25rem_1fr] border-b border-border pb-4 w-full">
            <div>
              <CalendarOutlined />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">Member since</h4>
              <p>{new Date(record.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <UserOrderList userId={record.id} />
      </div>
    </Drawer>
  );
};

export default ReadUser;

type UserAddressListProps = {
  record: CustomUser;
};

const UserAddressList = ({ record }: UserAddressListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {record.addresses.map((address) => (
        <li key={address.id} className="text-sm flex gap-2 items-center">
          <span>
            {address.isDefault ? (
              <CheckCircleOutlined className="text-green-500" />
            ) : (
              <RightCircleOutlined />
            )}
          </span>
          <p>
            {address.address} {address.townLocality}, {address.cityDistrict},{" "}
            {address.state}, {address.pincode}
          </p>
        </li>
      ))}
    </ul>
  );
};

type UserOrderListProps = {
  userId: string
}

const UserOrderList = ({userId} : UserOrderListProps) => {
  return <h1>User orders</h1>
}
