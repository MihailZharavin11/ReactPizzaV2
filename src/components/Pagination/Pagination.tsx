import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChange: (value: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChange }) => {
  return (
    <ReactPaginate
      className={style.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => {
        onChange(e.selected + 1);
      }}
      forcePage={currentPage - 1}
      pageRangeDisplayed={3}
      pageCount={4}
    />
  );
};
