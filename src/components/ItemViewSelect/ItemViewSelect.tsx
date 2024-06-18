import { ItemsViewType } from "@/types/api";
import Button from "../ui/Button";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

type ItemViewSelectProps = {
	itemsView: ItemsViewType;
	onClick: (itemsView: ItemsViewType) => void;
};

const ItemViewSelect = ({ itemsView, onClick }: ItemViewSelectProps) => {
	return (
		<div className="flex rounded-lg border border-border bg-dimBlack">
			<Button
				type="button"
				btnType="icon"
				className={`text-lg py-2 px-4 w-12 hover:text-blue-500 focus:outline-blue-500 ${
					itemsView === "LIST"
						? "rounded-none border-2 border-blue-500 rounded-tl-lg rounded-bl-lg "
						: ""
				}`}
				onClick={() => onClick("LIST")}
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
				onClick={() => onClick("GRID")}
			>
				<AppstoreOutlined />
			</Button>
		</div>
	);
};

export default ItemViewSelect;