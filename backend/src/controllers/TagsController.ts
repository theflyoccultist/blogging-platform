import { Request, Response } from "express";
import { Tags } from "../models/Tags";

interface TagAttribute {
    name: string;
}

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const allTags = await Tags.findAll();
        res.status(200).json(allTags);
    } catch (error) {
        res.status(500).json({ message: 'Unable to retrieve tags' });
        console.error(error);
    }
}

export const createTag = async (req: Request<{}, {}, TagAttribute>, res: Response) => {
    try {
        const { name } = req.body;
        const tag = await Tags.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: 'Unable to create tag' });
        console.error(error);
    }
}

export const updateTag = async (req: Request<{ id: string }, {}, TagAttribute>, res: Response): Promise<void> => {
    try {
        const tag = await Tags.update(req.body, {
            where: { id: req.params.id },
        });
        if (!tag) {
            res.status(404).json({ message: 'Tag not found' });
            return
        }
        res.status(200).json({ message: 'Tag Edited' })
    } catch (error) {
        res.status(500).json({ message: 'Unable to update tag' });
        console.error(error);
    }
}

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await Tags.destroy({
            where: { id: req.params.id },
        });

        if (result === 0) {
            res.status(404).json({ message: 'Tag not found' });
            return
        }

        res.status(204).json({ message: "Tag deleted" })
    } catch (error) {
        res.status(500).json({ message: 'Unable to delete tag' });
        console.error(error);
    }
}