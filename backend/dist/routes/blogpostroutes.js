"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogPostController_1 = require("../controllers/BlogPostController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Apply verifyToken middleware to protect routes
router.get('/blog', BlogPostController_1.getAllBlogPosts);
router.get('/blog/:id', BlogPostController_1.getBlogPost);
router.post('/blog', authMiddleware_1.verifyToken, BlogPostController_1.createBlogPost);
router.put('/blog/:id', authMiddleware_1.verifyToken, BlogPostController_1.updateBlogPost);
router.delete('/blog/:id', authMiddleware_1.verifyToken, BlogPostController_1.deleteBlogPost);
exports.default = router;
