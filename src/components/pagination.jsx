import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
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
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
        <nav aria-label="Page navigation example ">
    <ul className="inline-flex -space-x-px text-sm mt-4">
      <li>
        <button className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg 
             ${currentPage === 1 ? 'bg-gray-200' : 'cursor-pointer hover:bg-gray-100 hover:text-gray-700'} 
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={handlePrev} disabled={currentPage === 1} >Previous</button>
      </li>
      {pageNumbers.map((number) => (<li>
        <button key={number} className={` ${currentPage === number ? "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : " cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`} onClick={() => onPageChange(number)}>{number}</button>
      </li>))}
      <li>
        <button className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg 
             ${currentPage === totalPages ? 'bg-gray-200' : 'cursor-pointer hover:bg-gray-100 hover:text-gray-700'} 
             dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} disabled={currentPage === totalPages} onClick={handleNext}>Next</button>
      </li>
    </ul>
  </nav>
  );
}

export default Pagination;