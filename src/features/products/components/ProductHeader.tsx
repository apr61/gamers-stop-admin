import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  AppstoreOutlined,
  BarsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectProductItemsView,
  setProductCurrentItem,
  setProductItemsView,
} from "../productSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import ItemViewSelect from "@/components/ItemViewSelect/ItemViewSelect";

const ProductHeader = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const itemsView = useAppSelector(selectProductItemsView);
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchParams((prev) => {
      prev.set("search", e.target.value);
      return prev;
    });
  };

  const handleNew = () => {
    dispatch(
      setProductCurrentItem({
        record: null,
        action: "create",
      })
    );
	navigate('./new')
  };

  return (
    <header className="flex items-center gap-4">
      <div className="flex justify-between w-full">
        <Button className="flex items-center gap-2" onClick={handleNew}>
          <>
            <PlusOutlined />
            Add new product
          </>
        </Button>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="search"
            value={search}
            onChange={(e) => handleChange(e)}
          />
          <ItemViewSelect
            itemsView={itemsView}
            onClick={(value) => dispatch(setProductItemsView(value))}
          />
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
