import express from "express";
import { getAllBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost } from "../controllers/BlogPostController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();


// Apply verifyToken middleware to protect routes
router.get('/blog', verifyToken, getAllBlogPosts);
router.get('/blog/:id', verifyToken, getBlogPost);
router.post('/blog', verifyToken, createBlogPost);
router.put('/blog/:id', verifyToken, updateBlogPost);
router.delete('/blog/:id', verifyToken, deleteBlogPost);

export default router;
