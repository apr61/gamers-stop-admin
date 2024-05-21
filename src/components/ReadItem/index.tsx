import { selectCurrentItem } from "../../redux/slice/crudSlice";
import { useAppSelector } from "../../redux/store/hooks";

const ReadItem = () => {
  const { record } = useAppSelector(selectCurrentItem);
  if (record === null) return null;
  let content = null;
  if ("category_name" in record) {
    content = (
      <div className="flex flex-col gap-4 my-8">
        <div className="flex gap-2">
          <p className="font-medium">Category Name</p>
          <p>:</p>
          <p>{record.category_name}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-medium">Category Image</p>
          <p>:</p>
          <div>
            <img
              src={record?.category_image}
              alt={record?.category_name}
              className="w-12 h-12"
            />
          </div>
        </div>
      </div>
    );
  }

  if ("name" in record) {
    content = (
      <div className="flex flex-col gap-4 my-8">
        <div className="flex gap-2">
          <p className="font-medium">Name</p>
          <p>:</p>
          <p>{record.name}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-medium">Description</p>
          <p>:</p>
          <p>{record.description}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-medium">Images</p>
          <p>:</p>
          <div className="flex flex-wrap gap-2">
            {record.images.map((url) => (
              <img src={url} alt={record.name} className="w-12 h-12" />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <p className="font-medium">Price</p>
          <p>:</p>
          <p>{record.price}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-medium">Quantity</p>
          <p>:</p>
          <p>{record.quantity}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-medium">Category</p>
          <p>:</p>
          <p>{record?.category?.category_name}</p>
        </div>
      </div>
    );
  }
  return content;
};

export default ReadItem;
