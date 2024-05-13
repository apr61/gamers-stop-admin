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
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="border-2 border-dashed rounded-md p-4 flex gap-2 justify-center text-lg cursor-pointer"
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
