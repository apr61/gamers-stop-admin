import { PlusOutlined } from "@ant-design/icons";
import { forwardRef, useId } from "react";

type FileInputProps = {
  label: string;
  multiple?: boolean
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, multiple = false, ...props }, ref) => {
    const id = useId();
    return (
      <div className="flex flex-col min-h-full">
        <label
          htmlFor={id}
          className="border-2 border-dashed h-[10rem] rounded-md p-4 flex gap-2 justify-center items-center text-lg cursor-pointer"
        >
          <PlusOutlined />
          {label}
        </label>
        <input
          type="file"
          multiple={multiple}
          id={id}
          className="sr-only"
          {...props}
          ref={ref}
          accept="image/*"
        />
      </div>
    );
  }
);

export default FileInput;
