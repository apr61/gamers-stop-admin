type ImagePreviewProps = {
  images: FileList;
};

const ImagePreview = ({ images }: ImagePreviewProps) => {
  if (images === null) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {Array.from(images).map((fileList, index) => (
        <img
          src={URL.createObjectURL(fileList as unknown as Blob | MediaSource)}
          alt={`Image ${index}`}
          className="w-20 h-20"
          key={index}
        />
      ))}
    </div>
  );
};

export default ImagePreview;
