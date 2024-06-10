import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import { setCategoryCurrentItem } from "@/redux/slice/categorySlice";

const CategoryHeader = () => {
	const [search, setSearch] = useState<string>("");
	const dispatch = useAppDispatch();
	return (
		<header className="flex items-center gap-4">
			<h2 className="text-xl">Categories</h2>
			<div className="ml-auto flex gap-2">
				<div className="hidden md:block">
					<Input
						type="search"
						placeholder="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<Button
					className="flex items-center gap-2"
					onClick={() =>
						dispatch(
							setCategoryCurrentItem({
								record: null,
								action: "create",
							}),
						)
					}
				>
					<>
						<PlusOutlined />
						Add new category
					</>
				</Button>
			</div>
		</header>
	);
};

export default CategoryHeader;
