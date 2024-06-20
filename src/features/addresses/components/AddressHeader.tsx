import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { PlusOutlined } from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setAddressCurrentItem } from "../addressSlice";
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
							setAddressCurrentItem({
								record: null,
								action: "create",
							}),
						)
					}
				>
					<>
						<PlusOutlined />
						Add new address
					</>
				</Button>
				<div className="flex gap-2">
					<Input
						type="search"
						placeholder="search"
						value={search}
						onChange={(e) => handleChange(e)}
						className="bg-dimBlack border-border"
					/>
				</div>
			</div>
		</header>
	);
};

export default CategoryHeader;
