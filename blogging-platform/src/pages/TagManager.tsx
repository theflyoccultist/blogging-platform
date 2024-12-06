import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { refreshAuthToken } from "../middlewares/tokenRefresher";

const apiUrl = import.meta.env.VITE_API_URL;

const TagManager : React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const resetForm = () => {
        setUserInput('');
        setError(null);
    }

    const handleUserInput = () => {
        return userInput.toLowerCase().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }

    const handleTagCreation = async () => {
        const tagArray = handleUserInput();

        try {
            await refreshAuthToken();
            const requests = tagArray.map(tag =>
                axios.post(`${apiUrl}/api/tags`,
                    { name: tag },
                {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
                )
            );

            const responses = await axios.all(requests);

            resetForm();
            console.log("Tags created successfully: ", responses.map(res => res.data));
        } catch (error) {
            console.error('Error creating tags', error);
            setError('Failed to create tags. Please try again later.')
        }
    };

    return (
        <div>
            <div>
                {/* <label>Pick From Existing Tags:</label>
                <input 
                    type="text"
                /> */}
                {error && <div style={{ color: 'red', marginBottom: '10px'}}>{error}</div>}
                
                <label>Add New Tags:</label><br/>
                <label>Please separate your tags with a comma</label><br/>
                <input 
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '18px',
                    marginTop: '5px',
                    }}
                />                
            </div>

            <Button onClick={handleTagCreation} style={{ margin: '50px 20px', padding: '10px 20px'}}>
                Create Tags
            </Button>   
        </div>
    )
}

export default TagManager;