import express, { Request, Response } from 'express';
import { Users } from '../../models/Users';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const saltRounds = 12;

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const existingUser = await Users.findOne({ where: { username } });

        if (existingUser) {
            res.status(409).json({ message: 'Username already exists.' });
            return
        }
        
        const user = await Users.create({ username, password: hashedPassword })
        await user.save();

        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Registration failed '})
    }
});

export default router;