import { CustomError } from "@/types/api";
import toast from "react-hot-toast";

const errorHandler = async (error: CustomError) => {
  const { code, message } = error;
  let customMessage = "";
  if (code) {
    customMessage = `${code} - ${message}`;
  } else {
    customMessage = `500 - ${message}`;
  }
  toast.error(customMessage);
};

export default errorHandler;
