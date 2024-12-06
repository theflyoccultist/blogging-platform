import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import { quillModules, addCustomButtonLabel } from "../components/quillToolbarConfig";
import { refreshAuthToken } from "../middlewares/tokenRefresher";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import '../styles/Platform.css'
import { Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

const CreatePost : React.FC = () => {
    const navigate = useNavigate();
    const quillRef = useRef<ReactQuill>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        addCustomButtonLabel();
    }, []);

    const resetForm = () => {
        setTitle('');
        setContent('');
        setAuthor('');
        setError(null);
    };

    const memorizedModules = useMemo(
        () => quillModules(quillRef),
        [quillRef]
    );

    const handlePostCreation = async () => {
        if (!title || !content || !author) {
            setError('All fields are required.');
            return;
        }

        try {
            await refreshAuthToken();
            const response = await axios.post(`${apiUrl}/api/blog`,
                { title, content, author },
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
            <label>TItle:</label><br/>
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
                    ref={quillRef}
                    value={content}
                    onChange={setContent}
                    style={{ height: '300px' }}
                    modules={memorizedModules}
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