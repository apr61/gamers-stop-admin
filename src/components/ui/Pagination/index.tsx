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
        className={`p-2 rounded-md border-gray-300 hover:bg-accent text-sm`}
      >
        <LeftOutlined />
      </Button>
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          onClick={() => handlePage(index + 1)}
          btnType="icon"
          className={`py-1 px-3 rounded-md hover:bg-accent ${index + 1 === currentPage ? "bg-dimBlack border border-primary text-primary" : ""}`}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={isNextBtnDisabled}
        btnType="icon"
        className={`p-2 rounded-md hover:bg-accent text-sm`}
      >
        <RightOutlined />
      </Button>
    </div>
  );
};

export default Pagination;
