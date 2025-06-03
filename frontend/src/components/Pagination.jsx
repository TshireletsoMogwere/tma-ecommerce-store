import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const createPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxButtons);
    }

    if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = createPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm rounded-md border border-orange-500 text-orange-500 hover:bg-orange-100 disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm rounded-md border border-orange-500 text-orange-500 hover:bg-orange-100 disabled:opacity-50"
      >
        Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-sm rounded-md border ${
            page === currentPage
              ? "bg-orange-500 text-white"
              : "border-orange-300 text-orange-500 hover:bg-orange-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm rounded-md border border-orange-500 text-orange-500 hover:bg-orange-100 disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm rounded-md border border-orange-500 text-orange-500 hover:bg-orange-100 disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
}


