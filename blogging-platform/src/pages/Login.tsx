import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'

const apiUrl = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, 
                { username, password },
                { withCredentials: true }
            );
            localStorage.setItem('token', response.data.token);
            navigate('/platform');
        } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error response:', error.response);
                }
                setError('Invalid username or password');
            }
    }

    return(
        <div className='centered'>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={30}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={30}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;