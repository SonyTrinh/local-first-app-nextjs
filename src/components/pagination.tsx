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
          className="px-4 py-2 bg-white dark:bg-card border border-gray-300 dark:border-card-border rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors text-gray-700 dark:text-gray-300"
        >
          Previous
        </button>

        <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">Page {currentPage}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLoading}
          className="px-4 py-2 bg-black dark:bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 dark:hover:bg-blue-500 text-sm font-medium transition-colors border border-transparent"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;