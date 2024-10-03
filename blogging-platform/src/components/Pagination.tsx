import React from "react";
import { CDBPagination, CDBPageLink, CDBPageItem, CDBContainer } from "cdbreact";

const Pagination: React.FC = () => {
  return (
    <CDBContainer className="d-flex justify-content-center">
      <CDBPagination color="light">
        <CDBPageLink>Prev</CDBPageLink>
        <CDBPageItem>1</CDBPageItem>
        <CDBPageItem>2</CDBPageItem>
        <CDBPageItem>3</CDBPageItem>
        <CDBPageLink>Next</CDBPageLink>
      </CDBPagination>
    </CDBContainer>
  );
};
export default Pagination;