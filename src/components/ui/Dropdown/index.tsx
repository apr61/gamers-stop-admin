import { ReactElement } from "react";

type DropDownProps = {
  items: {
    label: string;
    icon?: ReactElement;
    key: string
  }[];
  onItemClick: (key: string) => void;
};

const Dropdown = ({ items, onItemClick }: DropDownProps) => {
  return (
    <div className="absolute right-0 top-4 mt-4 bg-white rounded-md overflow-hidden z-10 border">
      <ul className="border-1 min-w-fit">
        {items.map((item) => (
          <li
            key={item.key}
            className="p-2 cursor-pointer hover:bg-gray-300 w-full flex items-center gap-2"
            onClick={() => onItemClick(item.key)}
          >
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
