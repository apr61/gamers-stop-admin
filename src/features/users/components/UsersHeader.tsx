import Input from "@/components/ui/Input";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const UsersHeader = () => {
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
			<div className="flex w-full">
				<div className="ml-auto flex gap-2">
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

export default UsersHeader;
