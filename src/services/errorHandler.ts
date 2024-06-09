import toast from "react-hot-toast";

const errorHandler = async (
  error: string,
  statusCode: string | number | undefined = undefined,
) => {
  let message = "";
  if (statusCode) {
    message = `${statusCode} - ${error}`;
  } else {
    message = `500 - ${error}`;
  }
  toast.error(message);
  // throw new Error(error)
};

export default errorHandler;
