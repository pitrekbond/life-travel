"use client";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { CITIES_PER_PAGE } from "../_utils/constants";

export default function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages === 1) return null;

  return (
    <div className="flex justify-center mt-4">
      {currentPage !== 1 && (
        <button
          className="pl-1 pr-2 py-2 font-semibold bg-primary-950 rounded-md mr-2 flex items-center gap-1"
          onClick={handlePrevPage}
        >
          <HiChevronLeft style={{ strokeWidth: 2 }} />
          <span>Previous</span>
        </button>
      )}
      <span className="px-4 py-2 bg-primary-950 rounded-md">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage !== totalPages && (
        <button
          className="pl-2 pr-1 py-2 font-semibold bg-primary-950 rounded-md ml-2 flex items-center gap-1"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <HiChevronRight style={{ strokeWidth: 2 }} />
        </button>
      )}
    </div>
  );
}
