import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import '../styles/Platform.css'
import axios from 'axios';
import Pagination from './Pagination';

interface BlogPost {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  author: string;
  publishedAt: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Table: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
      const fetcBlogPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/blog`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            });
            console.log('blog posts fetched', response.data);
            setBlogPosts(response.data);
            setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        } catch (error) {
            console.error('Error fetching blog posts', error);
        }
      };
      fetcBlogPosts();
    }, []);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    }

    const handleRowClick = (id: number) => {
      navigate(`/editpost/${id}`); // Redirect to the edit page
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = blogPosts.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div style={{marginTop: "80px"}}>
      <CDBContainer>
        <CDBTable hover>
          <CDBTableHeader>
            <tr>
              <th>ID</th>
              <th>Post Title</th>
              <th>Status</th>
              <th>Author</th>
              <th>Date Issued</th>
              <th>Tags</th>
            </tr>
          </CDBTableHeader>
          <CDBTableBody>
            {Array.isArray(currentItems) && currentItems.length > 0 ? (
              currentItems.map((blog, key) => {
                const isoDateString = blog.publishedAt;
                const dateObject = new Date(isoDateString);
                const formattedDate = dateObject.toDateString();
              return (
              <tr key={key} onClick={() => handleRowClick(blog.id)} style={{ cursor: 'pointer' }}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>status</td>
                <td>{blog.author}</td>
                <td>{formattedDate}</td>
                <td>Tags</td>
              </tr>                
              );
            })
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>
                  No blog posts found.
                </td>
              </tr>
            )}
          </CDBTableBody>
        </CDBTable>
          <div style={{ position:'fixed', bottom:'0px'}}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
      </CDBContainer>      
      </div>
  );
};
export default Table;