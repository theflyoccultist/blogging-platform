import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import '../styles/Platform.css'
import axios from 'axios';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Table: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetcBlogPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/blog`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            });
            setBlogPosts(response.data);
        } catch (error) {
            console.error('Error fetching blog posts', error);
        }
      };
      fetcBlogPosts();
    }, []);

    const handleRowClick = (id: number) => {
      navigate(`/editpost/${id}`); // Redirect to the edit page
    }

    return (
      <div>
        {/* Table with blog posts */}
      <div style={{ marginTop: '80px' }}>
        <h3>Click on a post to add modifications</h3>
      <CDBContainer>
        <CDBTable hover>
          <CDBTableHeader>
            <tr>
              <th>ID</th>
              <th>Post Title</th>
              <th>Status</th>
              <th>Author</th>
              <th>Date_Issued</th>
              <th>Tags</th>
            </tr>
          </CDBTableHeader>
          <CDBTableBody>
            {Array.isArray(blogPosts) && blogPosts.length > 0 ? (
              blogPosts.map((blog, key) => {
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
      </CDBContainer>      
      </div>
      </div>
  );
};
export default Table;