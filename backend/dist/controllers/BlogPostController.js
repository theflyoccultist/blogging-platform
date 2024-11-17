"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPost = exports.getAllBlogPosts = void 0;
const BlogPost_1 = require("../models/BlogPost");
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield BlogPost_1.BlogPost.findAll();
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve all blog posts' });
        console.error(error);
    }
});
exports.getAllBlogPosts = getAllBlogPosts;
const getBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield BlogPost_1.BlogPost.findOne({ where: { id: req.params.id } });
        if (!blog) {
            res.status(404).json({ message: 'Blog post not found' });
            return;
        }
        console.log('Posts retrieved', blog);
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve blog post' });
        console.error(error);
    }
});
exports.getBlogPost = getBlogPost;
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author, publishedAt } = req.body;
        const blog = yield BlogPost_1.BlogPost.create({
            title,
            content,
            author,
            publishedAt,
        });
        console.log('New post created', blog);
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to create blog post' });
        console.error(error);
    }
});
exports.createBlogPost = createBlogPost;
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield BlogPost_1.BlogPost.update(req.body, {
            where: { id: req.params.id },
        });
        if (!blog) {
            res.status(404).json({ message: 'Blog post not found' });
            return;
        }
        res.status(200).json({ message: 'Blog post updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to update blog post' });
        console.error(error);
    }
});
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield BlogPost_1.BlogPost.destroy({
            where: { id: req.params.id },
        });
        if (result === 0) {
            res.status(404).json({ message: 'Blog post not found' });
            return;
        }
        res.status(204).json({ message: 'Blog post deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to delete blog post' });
        console.error(error);
    }
});
exports.deleteBlogPost = deleteBlogPost;
