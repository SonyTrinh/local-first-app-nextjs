"use client";

interface PaginationProps {
  currentPage: number;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  isLoading,
  handlePageChange,
}: PaginationProps) => {
  return (
    <div>
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          Previous
        </button>

        <span className="text-gray-600 font-medium">Page {currentPage}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLoading}
          className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 text-sm font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;