import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { refreshAuthToken } from "../middlewares/tokenRefresher";
import axios from 'axios';
import '../styles/Platform.css'
import { Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

const CreatePost : React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState<string | null>(null);

    const resetForm = () => {
        setTitle('');
        setThumbnail('');
        setContent('');
        setAuthor('');
        setError(null);
    };

    const handlePostCreation = async () => {
        if (!title || !content || !author) {
            setError('All fields are required.');
            return;
        }

        try {
            await refreshAuthToken();
            const response = await axios.post(`${apiUrl}/api/blog`,
                { title, thumbnail, content, author },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            resetForm();
            navigate("/platform");
            console.log("Post created successfully:", response.data);
        } catch (error) {
            console.error('Error creating post', error);
            setError('Failed to create post. Please try again.')
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto' }}>
            <h3>Create New Post</h3>

            {error && <div style={{ color: 'red', marginBottom: '10px'}}>{error}</div>}

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

            <Button onClick={handlePostCreation} style={{ margin: '50px 20px', padding: '10px 20px'}}>
                Create Post
            </Button>
        </div>
    );
};

export default CreatePost;