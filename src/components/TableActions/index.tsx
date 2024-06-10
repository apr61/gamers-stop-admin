import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Button from "@/components/ui/Button";

type TableActionsProps<T> = {
	readFn: (record: T) => void;
	editFn: (record: T) => void;
	deleteFn: (record: T) => void;
	record: T;
};

const TableActions = <T,>({
	readFn,
	deleteFn,
	editFn,
	record,
}: TableActionsProps<T>) => {
	const dropDownItems = [
		{
			label: "Show",
			icon: <EyeOutlined />,
			key: "read",
			className: "bg-blue-200 text-blue-500 hover:bg-blue-500",
		},
		{
			label: "Edit",
			icon: <EditOutlined />,
			key: "update",
			className: "bg-purple-200 text-purple-500 hover:bg-purple-500",
		},
		{
			label: "Delete",
			icon: <DeleteOutlined />,
			key: "delete",
			className: "bg-red-200 text-red-500 hover:bg-red-500",
		},
	];
	const handleDropdownOnClick = (key: string, record: T) => {
		switch (key) {
			case "read": {
				readFn(record);
				break;
			}
			case "update": {
				editFn(record);
				break;
			}
			case "delete": {
				deleteFn(record);
				break;
			}
			default: {
				break;
			}
		}
	};
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


export default TableActions