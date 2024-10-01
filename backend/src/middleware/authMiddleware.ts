import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
          }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as CustomRequest).token = decoded;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

export { verifyToken }
