import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './pagination.module.scss';

const Pagination = ({ onChange }) => {
  return (
    <ReactPaginate
      className={style.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => {
        onChange(e.selected + 1);
      }}
      pageRangeDisplayed={3}
      pageCount={4}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
