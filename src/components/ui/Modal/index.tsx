import { ReactNode, forwardRef } from "react";
import Button from "../Button";
import { CloseOutlined } from "@ant-design/icons";
import { cn } from "@/utils/cn";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  title: string;
  className?: string;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, handleClose, children, title, className }, ref) => {
    if (!isOpen) return;
    return (
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-pop-over z-50 flex items-center justify-center w-full h-full">
        <div
          className={cn(
            "min-w-fit  rounded-md z-10 relative py-4 px-8 mx-4 bg-dimBlack border border-border",
            className
          )}
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
  }
);

export default Modal;
