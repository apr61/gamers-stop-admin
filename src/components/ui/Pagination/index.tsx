import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "../Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setPage: (newPage: number) => void;
};

const Pagination = ({ currentPage, totalPages, setPage }: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const handlePage = (page: number) => {
    setPage(page);
  }

  const isPrevBtnDisabled = currentPage === 1;
  const isNextBtnDisabled = currentPage === totalPages;

  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={handlePrev}
        disabled={isPrevBtnDisabled}
        btnType="icon"
        className={`border p-2 rounded-md transition-all ease-in-out duration-150 ${isPrevBtnDisabled ? "bg-gray-200 border-gray-200 text-gray-400" : "border-gray-300 hover:bg-gray-200 text-gray-500"}`}
      >
        <LeftOutlined />
      </Button>
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          onClick={() => handlePage(index + 1)}
          btnType="icon"
          className={`border border-gray-300 text-gray-500 py-1 px-3 rounded-md hover:bg-gray-200 transition-all ease-in-out duration-150 ${index + 1 === currentPage ? "bg-gray-300 text-gray-700" : ""}`}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={isNextBtnDisabled}
        btnType="icon"
        className={`border p-2 rounded-md transition-all ease-in-out duration-150 ${isNextBtnDisabled ? "bg-gray-200 border-gray-200 text-gray-400" : "border-gray-300 hover:bg-gray-200 text-gray-500"}`}
      >
        <RightOutlined />
      </Button>
    </div>
  );
};

export default Pagination;
