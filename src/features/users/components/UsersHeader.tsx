import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { PlusOutlined } from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	selectUserItemsView,
	setUserCurrentItem,
	setUserItemsView,
} from "../usersSlice";
import { useSearchParams } from "react-router-dom";
import ItemViewSelect from "@/components/ItemViewSelect/ItemViewSelect";

const UsersHeader = () => {
	const [search, setSearch] = useState<string>("");
	const dispatch = useAppDispatch();
	const itemsView = useAppSelector(selectUserItemsView);
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
			<div className="flex w-full">
				<div className="ml-auto flex gap-2">
					<Input
						type="search"
						placeholder="search"
						value={search}
						onChange={(e) => handleChange(e)}
						className="bg-dimBlack border-border"
					/>
					<ItemViewSelect
						itemsView={itemsView}
						onClick={(value) => dispatch(setUserItemsView(value))}
					/>
				</div>
			</div>
		</header>
	);
};

export default UsersHeader;
