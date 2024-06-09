import { ReactElement, forwardRef } from "react";
import Button from "../Button";
import { CloseOutlined } from "@ant-design/icons";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactElement | ReactElement[];
  title: string;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, handleClose, children, title }, ref) => {
    if (!isOpen) return;
    return (
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-20 z-50 flex items-center justify-center w-full h-full">
        <div
          className="min-w-fit bg-white rounded-md z-10 relative py-4 px-8 mx-4"
          ref={ref}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button onClick={handleClose} btnType="icon">
              <CloseOutlined />
            </Button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  },
);

export default Modal;
