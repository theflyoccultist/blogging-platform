import React, { useEffect, useState } from "react";
import axios from 'axios';

import Sidebar from '../components/Sidebar'

const apiUrl = import.meta.env.VITE_API_URL;

interface BlogAttributes {
    id: number;
    title: string;
    content: Text;
    author: string;
}

const BlogPosts: React.FC = () => {
    // const [blog, setBlog] = useState<BlogAttributes[]>([]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/api/blog`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 }
    //             });
    //             setBlog(response.data);
    //         } catch (error) {
    //             console.error('Error fetching blogposts', error);
    //         }
    //     };
    //     fetchPosts();
    // }, []);

    return (
            <Sidebar />
    );
};

export default BlogPosts;