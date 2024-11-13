import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import '../styles/Platform.css'

interface EditBlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const EditPost : React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editBlogPost, setEditBlogPost] = useState<EditBlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/blog/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEditBlogPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
      } catch (error) {
        console.error('Error fetching blog post', error);  
      }
    };
    if (id) fetchPostData();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`${apiUrl}/api/blog/${id}`, 
        { 
          title, 
          content, 
          author, 
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }          
        }
      );
      setEditBlogPost(response.data);
    } catch (error) {
      console.error('Error editing post', error);
    }
  };

  const handleReset = () => {
    if (editBlogPost) {
      setTitle(editBlogPost.title);
      setContent(editBlogPost.content);
      setAuthor(editBlogPost.author);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h3>Edit Current Post</h3>
      <div style={{ marginBottom: '20px' }}>
        <label>Title:</label>
        <input 
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            marginTop: '5px',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
          <label>Content:</label>
          <ReactQuill
            value={content} 
            onChange={setContent} 
            style={{ height: '300px' }}
          />
      </div>

      <div>
        <label>Author:</label>
        <input 
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            marginTop: '5px',
          }}
        />
      </div>
      
      <Button onClick={handleSave} style={{ margin: '50px 20px', padding: '10px 20px'}}>
        Save Changes
      </Button>
      <Button onClick={handleReset} variant='secondary' style={{ margin: '50px 20px', padding: '10px 20px'}}>
        Reset
      </Button>
    </div>
  );
};

export default EditPost;
