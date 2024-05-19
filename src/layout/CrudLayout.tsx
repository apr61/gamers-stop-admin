import DataTable from "../components/DataTable/Index";
import DeleteModal from "../components/DeleteModal";
import Drawer from "../components/ui/Drawer";
import {
  resetActionType,
  selectCurrentItem,
} from "../redux/slice/crudSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import {
  closeDrawer,
  openDrawer,
  selectDrawer,
} from "../redux/slice/crudActionsSlice";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CrudConfig } from "../utils/types";
import ReadItem from "../components/ReadItem";
import { ChangeEvent, FC, useState } from "react";

type CrudLayoutProps = {
  config: CrudConfig;
  Form: FC<unknown>
};

const CrudLayout = ({ config, Form }: CrudLayoutProps) => {
  const currentItem = useAppSelector(selectCurrentItem);
  const dispatch = useAppDispatch();
  const drawer = useAppSelector(selectDrawer);

  const handleDrawer = () => {
    dispatch(closeDrawer());
    dispatch(resetActionType());
  };

  return (
    <>
      <Drawer
        isDrawerOpen={drawer}
        closeDrawer={handleDrawer}
        title={config.DRAWER_TITLE}
      >
        {currentItem.action === "read" ? (
          <ReadItem />
        ) : (
          <Form />
        )}
      </Drawer>
      <div className="px-8 py-4 w-full bg-white rounded-md">
        <FixedHeaderContent config={config} />
        <DataTable config={config} />
      </div>
      <DeleteModal config={config} />
    </>
  );
};

export default CrudLayout;

type FixedHeaderContent = {
  config: CrudConfig;
};

const FixedHeaderContent = ({ config }: FixedHeaderContent) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [_, setSearchParams] = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchParams((prev) => {
      prev.set("search", e.target.value);
      return prev;
    });
  };
  return (
    <header className="flex items-center gap-4">
      <button
        className="text-lg hover:text-blue-500 py-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftOutlined />
      </button>
      <h2 className="text-xl">{config.DATA_TABLE_TITLE}</h2>
      <div className="ml-auto flex gap-2">
        <Input
          type="search"
          placeholder="search"
          value={search}
          onChange={(e) => handleChange(e)}
        />
        <Button
          className="flex items-center gap-2"
          onClick={() => dispatch(openDrawer())}
        >
          <>
            <PlusOutlined />
            {config.ADD_NEW_ITEM}
          </>
        </Button>
      </div>
    </header>
  );
};
