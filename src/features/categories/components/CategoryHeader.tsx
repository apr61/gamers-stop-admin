import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  AppstoreOutlined,
  BarsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import { setCategoryCurrentItem } from "../categorySlice";
import { useSearchParams } from "react-router-dom";

const CategoryHeader = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
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
      <div className="flex justify-between w-full">
        <Button
          className="flex items-center gap-2"
          onClick={() =>
            dispatch(
              setCategoryCurrentItem({
                record: null,
                action: "create",
              })
            )
          }
        >
          <>
            <PlusOutlined />
            Add new category
          </>
        </Button>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="search"
            value={search}
            onChange={(e) => handleChange(e)}
          />
          <div className="bg-white flex rounded-lg border">
            <Button
              type="button"
              btnType="icon"
              className="py-2 px-4 border border-blue-500 text-lg"
            >
              <BarsOutlined />
            </Button>
            <Button
              type="button"
              btnType="icon"
              className="py-2 px-4 border border-blue-500 text-lg"
            >
              <AppstoreOutlined />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CategoryHeader;
