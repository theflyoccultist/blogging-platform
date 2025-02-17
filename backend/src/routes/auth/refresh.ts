import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import RefreshToken from '../../models/RefreshToken';

const router = express.Router();

const isDevelopment = process.env.NODE_ENV === "development";

router.post('/refresh', async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshtoken;

        if (!refreshToken) {
            console.error("No refresh token in cookies");
            res.status(401).json({ error: 'No refresh token provided' });
            return;
        }

        const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });
        if (!tokenRecord) {
            console.error("Invalid refresh token");
            res.status(401).json({ error: 'Invalid refresh token' });
            return;
        }

        if (new Date() > tokenRecord.expiresAt) {
            console.error("Refresh token expired");
            await tokenRecord.destroy();
            res.status(401).json({ error: 'Refresh token expired' });
            return;
        }

        const token = jwt.sign({ id: tokenRecord.userId }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        const newRefreshToken = uuidv4();
        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + 7); // Valid for 7 days

        await tokenRecord.update({ token: newRefreshToken, expiresAt: newExpiresAt });

        res.cookie('refreshtoken', newRefreshToken, {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: isDevelopment ? "strict" : "none",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in /refresh endpoint:', error);
        res.status(500).json({ error: 'Error refreshing token' });
    }
});

export default router;
