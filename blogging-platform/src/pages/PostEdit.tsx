import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Editor from "../components/Editor";
import { refreshAuthToken } from '../middlewares/tokenRefresher';
import axios from 'axios';
import '../styles/Platform.css';

interface EditBlogPost {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  author: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const EditPost : React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [editBlogPost, setEditBlogPost] = useState<EditBlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/blog/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTitle(response.data.title);
        setThumbnail(response.data.thumbnail);
        setContent(response.data.content);
        setAuthor(response.data.author);
      } catch (error) {
        console.error('Error fetching blog post', error);  
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPostData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  const handleSave = async () => {
    try {
      await refreshAuthToken();
      const response = await axios.put(`${apiUrl}/api/blog/${id}`, 
        { title, thumbnail, content, author },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }          
        }
      );

      setEditBlogPost(response.data);
      navigate("/platform");
    } catch (error) {
      console.error('Error editing post', error);
    }
  };

  const handleReset = async () => {
    if (editBlogPost) {
      await refreshAuthToken();
      setTitle(editBlogPost.title);
      setContent(editBlogPost.content);
      setAuthor(editBlogPost.author);
    }
  };

  const handleDelete = async () => {
    try {
      await refreshAuthToken();
      await axios.delete(`${apiUrl}/api/blog/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }          
        });
        navigate("/platform");
    } catch (error) {
      console.error('Error deleting post', error);
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h3>Edit Current Post</h3>
      <div style={{ marginBottom: '20px' }}>
        <label>Title:</label><br/>
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
            <label>Thumbnail:</label><br/>
            <div className="mb-2 text-muted">Add your image URL here</div>
            <input 
                type='text'
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
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
          <Editor
            value={content} 
            handleChange={setContent}
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
            marginTop: '50px',
          }}
        />
      </div>
      
      <Button onClick={handleSave} style={{ margin: '50px 20px', padding: '10px 20px'}}>
          Save Changes
      </Button>
      <Button onClick={handleReset} variant='secondary' style={{ margin: '50px 20px', padding: '10px 20px'}}>
          Revert Changes
      </Button>
      <Button 
        variant='danger'
        style={{ margin: '50px 20px', padding: '10px 20px'}}
        onClick={() => {
          if (window.confirm(`Are you sure you want to delete the current post?`)) {
            handleDelete();            
          }
        }}
      > 
        Delete Post
      </Button>
    </div>
  );
};

export default EditPost;
