import express from "express";
import { getAllTags, createTag, updateTag, deleteTag } from "../controllers/TagsController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/', getAllTags);
router.post('/', verifyToken, createTag);
router.put('/:id', verifyToken, updateTag);
router.delete('/:id', verifyToken, deleteTag)

export default router;