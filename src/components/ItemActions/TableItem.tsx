import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Button from "@/components/ui/Button";
import { ItemActionsType } from "@/types/api";

type TableActionsProps<T> = {
	readFn?: (record: T) => void;
	editFn?: (record: T) => void;
	deleteFn?: (record: T) => void;
	record: T;
	allowedActions?: ("READ" | "UPDATE" | "DELETE")[];
};

export const TableActions = <T,>({
	readFn,
	deleteFn,
	editFn,
	record,
	allowedActions = ["READ", "UPDATE", "DELETE"],
}: TableActionsProps<T>) => {
	let dropDownItems: ItemActionsType[] = [
		{
			label: "Show",
			icon: <EyeOutlined />,
			key: "READ",
			className: "bg-blue-200 dark:bg-blue-500 text-blue-500 dark:text-blue-200 hover:bg-blue-500",
		},
		{
			label: "Edit",
			icon: <EditOutlined />,
			key: "UPDATE",
			className: "bg-purple-200 dark:bg-purple-500 text-purple-500 dark:text-purple-200 hover:bg-purple-500",
		},
		{
			label: "Delete",
			icon: <DeleteOutlined />,
			key: "DELETE",
			className: "bg-red-200 dark:bg-red-500 dark:text-red-200 text-red-500 hover:bg-red-500",
		},
	];
	const handleDropdownOnClick = (key: string, record: T) => {
		switch (key) {
			case "READ": {
				readFn && readFn(record);
				break;
			}
			case "UPDATE": {
				editFn && editFn(record);
				break;
			}
			case "DELETE": {
				deleteFn && deleteFn(record);
				break;
			}
			default: {
				break;
			}
		}
	};
	dropDownItems = dropDownItems.filter(
		(dropDown) => allowedActions.indexOf(dropDown.key) !== -1,
	);
	return (
		<div className="flex gap-1 items-center">
			{dropDownItems.map((item) => (
				<Button
					title={item.label}
					btnType="icon"
					onClick={() => handleDropdownOnClick(item.key, record)}
					key={item.label}
				>
					<span
						className={`grid place-content-center p-2 w-8 h-8 rounded-full hover:text-white ${item.className}`}
					>
						{item.icon}
					</span>
				</Button>
			))}
		</div>
	);
};
