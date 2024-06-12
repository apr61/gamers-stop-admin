import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  AppstoreOutlined,
  BarsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  selectProductItemsView,
  setProductCurrentItem,
  setProductItemsView,
} from "../productSlice";
import { useSearchParams } from "react-router-dom";

const ProductHeader = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const itemsView = useAppSelector(selectProductItemsView);
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
			  setProductCurrentItem({
				record: null,
				action: "create",
			  })
			)
		  }
		>
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
		  <div className="bg-white flex rounded-lg border">
			<Button
			  type="button"
			  btnType="icon"
			  className={`text-lg py-2 px-4 w-12 hover:text-blue-500 focus:outline-blue-500 ${
				itemsView === "LIST"
				  ? "rounded-none border-2 border-blue-500 rounded-tl-lg rounded-bl-lg"
				  : ""
			  }`}
			  onClick={() => dispatch(setProductItemsView("LIST"))}
			>
			  <BarsOutlined />
			</Button>
			<Button
			  type="button"
			  btnType="icon"
			  className={`text-lg py-2 px-4 w-12 hover:text-blue-500 focus:outline-blue-500 ${
				itemsView === "GRID"
				  ? "rounded-none border-2 border-blue-500 rounded-tr-lg rounded-br-lg"
				  : ""
			  }`}
			  onClick={() => dispatch(setProductItemsView("GRID"))}
			>
			  <AppstoreOutlined />
			</Button>
		  </div>
		</div>
	  </div>
	</header>
  );
};

export default ProductHeader;
