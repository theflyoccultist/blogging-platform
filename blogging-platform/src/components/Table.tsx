import React, { useEffect, useState } from 'react';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
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

    return (
      <div>
        {/* list of blog posts */}
      <div style={{ marginTop: '80px' }}>
      <CDBContainer>
        <CDBTable hover>
          <CDBTableHeader>
            <tr>
              <th>ID</th>
              <th>Post Title</th>
              <th>Content</th>
              <th>Author</th>
              <th>Published at</th>
            </tr>
          </CDBTableHeader>
          <CDBTableBody>
            {blogPosts.map((blog, key) => {
              return (
              <tr key={key}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.content}</td>
                <td>{blog.author}</td>
                <td>{blog.publishedAt}</td>
              </tr>                
              )
            })}
          </CDBTableBody>
        </CDBTable>
      </CDBContainer>      
      </div>
      </div>
      
      

  );
};
export default Table;