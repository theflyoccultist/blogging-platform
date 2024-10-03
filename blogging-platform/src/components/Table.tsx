import React from 'react';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';

const Table: React.FC = () => {
  return (
    <div style={{ marginTop: '80px' }}>
    <CDBContainer>
      <CDBTable hover>
        <CDBTableHeader>
          <tr>
            <th>ID</th>
            <th>Post Title</th>
            <th>Status</th>
            <th>Tags</th>
          </tr>
        </CDBTableHeader>
        <CDBTableBody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </CDBTableBody>
      </CDBTable>
    </CDBContainer>      
    </div>

  );
};
export default Table;