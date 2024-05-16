import { DeleteOutlined } from "@ant-design/icons";

type ImagePreviewProps = {
  images: string[];
  handleOnClick: (url: string) => void;
};

const ImagePreview = ({ images, handleOnClick }: ImagePreviewProps) => {
    if(images.length <= 0) return
  return (
    <div className="flex gap-2 flex-wrap">
      {images.map((url, index) => (
        <div
          key={url}
          className="w-16 h-16 relative hover:brightness-[85%] group transistion ease-in-out duration-150"
        >
          <img src={url} alt={`image ` + index} className="w-full h-full" />
          <button
          type="button"
            className="hidden group-hover:block text-red-600 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={() => handleOnClick(url)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
