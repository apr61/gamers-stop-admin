import toast from "react-hot-toast";

const errorHandler = (error: string) => {
  toast.error(error);
};

export default errorHandler;
