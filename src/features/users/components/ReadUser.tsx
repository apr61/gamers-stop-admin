import { useDispatch } from "react-redux";
import { resetUserCurrentItem, selectUserCurrentItem } from "../usersSlice";
import { useAppSelector } from "@/store/hooks";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useEffect } from "react";
import Drawer from "@/components/ui/Drawer";
import BlankUserProfile from "@/assets/blank-profile-picture.webp";
import { MailOutlined } from "@ant-design/icons";
import { ROLE_COLORS } from "@/utils/constants";

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
    <Drawer isDrawerOpen={isOpen} closeDrawer={handleClose} title="User">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="w-24 h-24">
          <img
            className="w-full h-full rounded-full"
            src={record.avatar_url ? record.avatar_url : BlankUserProfile}
            alt={record.full_name || ""}
          />
        </div>
        <h2 className="text-xl font-semibold">{record.full_name}</h2>
        <p className="flex gap-2">
          <MailOutlined />
          {record.email}
        </p>
        <hr className="w-full my-4" />
        <ul className="flex flex-col gap-4 items-start self-start">
          <li className="flex gap-2 items-center">
            <p className="font-semibold">User Role</p> :{" "}
            <p
              className={`py-1 px-4 rounded-2xl w-fit ${
                ROLE_COLORS[record.user_role]
              }`}
            >
              {record.user_role}
            </p>
          </li>
          <li className="flex gap-2">
            <p className="font-semibold">Member since</p> :{" "}
            <p>{new Date(record.created_at).toLocaleDateString()}</p>
          </li>
        </ul>
      </div>
    </Drawer>
  );
};

export default ReadUser;
