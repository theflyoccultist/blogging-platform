import express, { Request, Response } from 'express';
import { Users } from '../../models/Users';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RefreshToken from '../../models/RefreshToken';

dotenv.config();

const router = express.Router();

interface LoginRequestBody {
    username: string;
    password: string;
}

const isDevelopment = process.env.NODE_ENV === "development";

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password }: LoginRequestBody = req.body;

        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return
        }

        const user = await Users.findOne({ where: { username } });
            if (!user) {
                res.status(401).json({ error: 'User not found' });
                return
            }

        const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({ error: 'Invalid password' });
                return
            }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '15m',
        });

        const refreshToken = uuidv4();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Valid for 7 days

        await RefreshToken.create({
            token: refreshToken,
            userId: user.id,
            expiresAt,
        });

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: isDevelopment ? "strict" : "none",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in /login endpoint:', error);
        res.status(500).json({ error: 'Login failed' });
        return
    }
});

export default router;