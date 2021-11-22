import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

export interface PaginationProps {
  page: number,
  totalPages: number,
  onPageChange: (newPage: number) => void
}

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <BootstrapPagination className="justify-content-center">
      {(page != 0 && totalPages > 0) && <BootstrapPagination.First onClick={() => onPageChange(0)} />}
      {page > 0 && page - 1 < totalPages && <BootstrapPagination.Prev onClick={() => onPageChange(page - 1)} />}
      {page - 1 > 0 && page - 2 < totalPages && <BootstrapPagination.Item onClick={() => onPageChange(page - 2)}>{page - 1}</BootstrapPagination.Item>}
      {page > 0 && page - 1 < totalPages && <BootstrapPagination.Item onClick={() => onPageChange(page - 1)}>{page}</BootstrapPagination.Item>}
      {page < totalPages && <BootstrapPagination.Item active>{page + 1}</BootstrapPagination.Item>}
      {page + 1 < totalPages && <BootstrapPagination.Item onClick={() => onPageChange(page + 1)}>{page + 2}</BootstrapPagination.Item>}
      {page + 2 < totalPages && <BootstrapPagination.Item onClick={() => onPageChange(page + 2)}>{page + 3}</BootstrapPagination.Item>}
      {page + 1 < totalPages && <BootstrapPagination.Next onClick={() => onPageChange(page + 1)} />}
      {(page != (totalPages - 1) && totalPages > 0 )&& <BootstrapPagination.Last onClick={() => onPageChange(totalPages - 1)} />}
    </BootstrapPagination>
  );
};

export default Pagination;