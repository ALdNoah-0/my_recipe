import React from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import '../styles/Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button"
        title="Previous page"
      >
        <ArrowLeft size={18} weight="bold" style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="pagination-number">
            1
          </button>
          {startPage > 2 && <span className="pagination-dots">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="pagination-dots">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="pagination-number">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
        title="Next page"
      >
        Next
        <ArrowRight size={18} weight="bold" style={{ marginLeft: '4px', verticalAlign: 'text-bottom' }} />
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
