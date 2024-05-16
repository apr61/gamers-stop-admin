import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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

  const isPrevBtnDisabled = currentPage === 1;
  const isNextBtnDisabled = currentPage === totalPages;

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={handlePrev}
        disabled={isPrevBtnDisabled}
        className={`border py-1 px-2 rounded-md transition-all ease-in-out duration-150 ${isPrevBtnDisabled ? "bg-gray-200 border-gray-200 text-gray-400" : "border-gray-300 hover:bg-gray-200 text-gray-500"}`}
      >
        <LeftOutlined />
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <Link
          key={index}
          to={`?page=${index + 1}`}
          className={`border border-gray-300 text-gray-500 py-1 px-3 rounded-md hover:bg-gray-200 transition-all ease-in-out duration-150 ${index + 1 === currentPage ? "bg-gray-300 text-gray-700" : ""}`}
        >
          {index + 1}
        </Link>
      ))}
      <button
        onClick={handleNext}
        disabled={isNextBtnDisabled}
        className={`border py-1 px-2 rounded-md transition-all ease-in-out duration-150 ${isNextBtnDisabled ? "bg-gray-200 border-gray-200 text-gray-400" : "border-gray-300 hover:bg-gray-200 text-gray-500"}`}
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Pagination;
