import express, { Request, Response } from 'express';
import { Users } from '../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const saltRounds = 12;

interface LoginRequestBody {
    username: string;
    password: string;
}

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const existingUser = await Users.findOne({ where: { username } });
        console.log('User found', existingUser);

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

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password }: LoginRequestBody = req.body;

        const user = await Users.findOne({ where: { username } });
            if (user === null) {
                res.status(401).json({ error: 'User not found' });
                return
            }

        const passwordMatch = await bcrypt.compare(password, user.password);
            console.log('Password match', passwordMatch);
            if (!passwordMatch) {
                res.status(401).json({ error: 'Invalid password' });
                return
            }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });
        
        console.log('Generated token:', token)
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
        return
    }
});

export default router;