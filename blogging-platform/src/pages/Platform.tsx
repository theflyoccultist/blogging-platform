import React, { useEffect, useState } from "react";
import axios from 'axios';

interface BlogAttributes {
    id: number;
    title: string;
    content: Text;
    author: string;
}

const BlogPosts: React.FC = () => {
    const [blog, setBlog] = useState<BlogAttributes[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://fali8410.odns.fr/blogging-platform/backend/api/blog', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blogposts', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Manage Blog Posts</h2>
        </div>
    )
}

export default BlogPosts;