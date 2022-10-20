import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import './pagination.scss';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages < 2) {
    return null;
  }
  return (
    <BootstrapPagination>
      {page !== 0 && totalPages > 1 && <BootstrapPagination.First onClick={() => onPageChange(0)} />}
      {page !== 0 && totalPages > 1 && <BootstrapPagination.Prev onClick={() => onPageChange(page - 1)} />}
      {page > 1 && totalPages > 2 && (
        <BootstrapPagination.Item onClick={() => onPageChange(page - 2)}>{page - 1}</BootstrapPagination.Item>
      )}
      {page > 0 && totalPages > 1 && (
        <BootstrapPagination.Item onClick={() => onPageChange(page - 1)}>{page}</BootstrapPagination.Item>
      )}
      <BootstrapPagination.Item active>{page + 1}</BootstrapPagination.Item>
      {page < totalPages - 1 && (
        <BootstrapPagination.Item onClick={() => onPageChange(page + 1)}>{page + 2}</BootstrapPagination.Item>
      )}
      {page < totalPages - 2 && (
        <BootstrapPagination.Item onClick={() => onPageChange(page + 2)}>{page + 3}</BootstrapPagination.Item>
      )}
      {page !== totalPages - 1 && totalPages > 1 && <BootstrapPagination.Next onClick={() => onPageChange(page + 1)} />}
      {page !== totalPages - 1 && totalPages > 1 && (
        <BootstrapPagination.Last onClick={() => onPageChange(totalPages - 1)} />
      )}
    </BootstrapPagination>
  );
};

export default Pagination;
