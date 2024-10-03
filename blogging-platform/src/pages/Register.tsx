import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/platform');
        } catch (error: any) {
            if (error.response) {

                const status = error.response.status;
                const message = error.response.data.message;

                if (status === 409) {
                    setError('Username already exists. Please choose another one.')
                } else {
                    setError(message || 'An error occured during registration. Please try again later.')
                }

            } else {
                setError('Network error. Could not reach the server. Please try again later.')
            }
        }
    };

    return(
        <div>
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register;