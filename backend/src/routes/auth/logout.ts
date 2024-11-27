import express, { Request, Response } from 'express';
import RefreshToken from '../../models/RefreshToken';

const router = express.Router();

const isDevelopment = process.env.NODE_ENV === "development";

router.post('/logout', async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshtoken;

        if (!refreshToken) {
            res.status(400).json({ error: 'No refresh token provided' });
            return;
        }

        const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });
        if (tokenRecord) {
            await tokenRecord.destroy();
        }

        res.clearCookie('refreshtoken', {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: isDevelopment ? "strict" : "none",
            path: '/',
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in /logout endpoint:', error);
        res.status(500).json({ error: 'Error during logout' });
    }
})

export default router;