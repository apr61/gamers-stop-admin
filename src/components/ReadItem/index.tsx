import { selectCurrentItem } from "../../redux/slice/crudSlice";
import { useAppSelector } from "../../redux/store/hooks";

const ReadItem = () => {
  const { record } = useAppSelector(selectCurrentItem);
  const content = (
    <div className="flex flex-col gap-4 my-8">
      <div className="flex gap-2">
        <p className="font-medium">Category name</p>
        <p>:</p>
        <p>{record?.category_name}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-medium">Category Image</p>
        <p>:</p>
        <div>
            <img src={record?.category_image} alt={record?.category_name}  className="w-12 h-12"/>
        </div>
      </div>
    </div>
  );
  return content;
};

export default ReadItem;
