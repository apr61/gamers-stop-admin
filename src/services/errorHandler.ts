import toast from "react-hot-toast";

const errorHandler = (
  error: string,
  statusCode: string | number | undefined,
) => {
  let message = "";
  if (statusCode) {
    message = `${statusCode} - ${error}`;
  } else {
    message = `500 - ${error}`;
  }
  toast.error(message);
  return {
    statusCode: statusCode ? statusCode : 500,
    message: error,
  };
};

export default errorHandler;
