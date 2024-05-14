import { ReactElement, forwardRef } from "react";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactElement | ReactElement[];
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, handleClose, children }, ref) => {
    if (!isOpen) return;
    return (
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-20 z-20 flex items-center justify-center w-full h-full">
        <div className="w-fit bg-white rounded-md z-10 relative" ref={ref}>
          <button
            onClick={handleClose}
            className="absolute top-0 right-4 text-3xl"
          >
            &times;
          </button>
          <div className="m-8">{children}</div>
        </div>
      </div>
    );
  },
);

export default Modal;
