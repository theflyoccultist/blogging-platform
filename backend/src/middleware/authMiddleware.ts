import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

interface AuthRequest extends Request {
    user?: any;
}

interface JwtPayload {
    id: number;
    role: string;
}

function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];  // Extract token after 'Bearer'
    
    if (!token) return res.status(401).json({ error: 'Access denied. Invalid token format.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;
