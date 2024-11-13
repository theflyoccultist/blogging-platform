import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import '../styles/Platform.css'
import { Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

const CreatePost : React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState<string | null>(null)

    const handlePostCreation = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/blog`,
                { title, content, author },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            setTitle('');
            setContent('');
            setAuthor('');
            navigate("/platform");
            console.log("Post created successfully:", response.data);
        } catch (error) {
            console.error('Error editing post', error);
            setError('Failed to create post. Please try again.')
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto' }}>
            <h3>Create New Post</h3>

            {error && <div style={{ color: 'red', marginBottom: '10px'}}>{error}</div>}

            <div style={{ marginBottom: '20px' }}>
            <label>TItle:</label>
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
                    marginTop: '50px',
                }}
                />
            </div>

            <Button onClick={handlePostCreation} style={{ margin: '50px 20px', padding: '10px 20px'}}>
                Create Post
            </Button>
        
        </div>
    );
};

export default CreatePost;