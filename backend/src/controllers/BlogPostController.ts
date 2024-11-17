import { Request, Response } from "express";
import { BlogPost } from "../models/BlogPost";

interface BlogPostAttributes {
    title: string;
    content: string;
    author: string;
    publishedAt: Date;
}

export const getAllBlogPosts = async (req: Request, res: Response) => {
    try {
        const blogs = await BlogPost.findAll();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Unable to retrieve all blog posts' });
        console.error(error);
    }
}

export const getBlogPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const blog = await BlogPost.findOne({ where: { id: req.params.id }});
        if (!blog) {
            res.status(404).json({ message: 'Blog post not found' });
            return
        }
        console.log('Posts retrieved', blog)
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Unable to retrieve blog post' });
        console.error(error);
    }
};

export const createBlogPost = async (req: Request<{}, {}, BlogPostAttributes>, res: Response) => {
    try {
        const { title, content, author, publishedAt } = req.body;

        const blog = await BlogPost.create({
            title,
            content,
            author,
            publishedAt,
        });
        console.log('New post created', blog)
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Unable to create blog post' });
        console.error(error);
    }
};

export const updateBlogPost = async (req: Request<{ id: string }, {}, BlogPostAttributes>, res: Response): Promise<void> => {
    try {
        const blog = await BlogPost.update(req.body, {
            where: { id: req.params.id },
          });

          if (!blog) {
            res.status(404).json({ message: 'Blog post not found' })
            return
          }

          res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Unable to update blog post' });
        console.error(error);
    }
};

export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await BlogPost.destroy({
            where: { id: req.params.id },
        });

        if (result === 0) {
            res.status(404).json({ message: 'Blog post not found' });
            return
        }

        res.status(204).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Unable to delete blog post' });
        console.error(error);
    }
}