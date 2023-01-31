import React from "react";

const Pagination = ({ linksPerPage, totalLinks, currentPage, handlePageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
    pageNumbers.push(i);
  }

  return ( (totalLinks > 0 ) &&
    <nav className="pagination-navigation">
      <button
        disabled={currentPage === 1}
        data-testid="previous-button"
        onClick={() => handlePageChange(currentPage - 1)}
        className="previous-button"
      />
      {pageNumbers.map((number)=>{
         return <button className={`dot-button ${currentPage === number? 'is-active':''}`} key={number} onClick={() => handlePageChange(number)}>
          {number}
        </button>
      })}
      <button
        disabled={currentPage === pageNumbers.length}
        data-testid="next-button"
        onClick={() => handlePageChange(currentPage + 1)}
        className="next-button"
      />
    </nav>
  );
}

export default Pagination;
