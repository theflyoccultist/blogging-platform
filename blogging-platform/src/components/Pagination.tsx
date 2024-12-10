import React from "react";
import { CDBPagination, CDBPageLink, CDBPageItem, CDBContainer } from "cdbreact";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  return (
    <CDBContainer className="d-flex justify-content-center">
      <CDBPagination color="light">
        <CDBPageLink 
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}>
          Prev
        </CDBPageLink>
        {Array.from({ length: totalPages }, (_, index) => (
        <CDBPageItem
          key={index + 1}
          onClick={() => handleClick(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </CDBPageItem>
      ))}
        <CDBPageLink
          onClick={() => handleClick(currentPage +1)}
          disabled={currentPage === totalPages}>
            Next
        </CDBPageLink>
      </CDBPagination>
    </CDBContainer>
  );
};
export default Pagination;