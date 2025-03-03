import express, {Request, Response} from 'express';
import { sequelize } from "./config/database";
import cookieParser from 'cookie-parser';
import { limiter } from "./middleware/rateLimit";
import { preventCache } from "./middleware/preventCache"
import dotenv from "dotenv";
dotenv.config();

import authRoutes from './routes/auth/index';
import blogPostRoutes from './routes/blogpostroutes';
import tagRoutes from './routes/tagroutes';
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'https://www.rinkakuworks.com',
    'https://www.blogging-platform.rinkakuworks.com'
];

app.use((req, res, next) => {
    const origin = req.headers.origin || `https://${req.headers.host}`;

    if (allowedOrigins.includes(origin)) {
        cors({
            origin: origin, // Dynamically set the origin
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: origin === 'https://www.blogging-platform.rinkakuworks.com' // Allow credentials only for blogging-platform
        })(req, res, next);
    } else {
        res.status(403).json({ message: 'Origin not allowed by CORS' });
    }
});

app.use(cookieParser());

app.use(express.json());

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Sequelize models synced successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err)
    })

app.use('/backend/auth', authRoutes);
app.use('/backend/api', limiter, preventCache, blogPostRoutes);
app.use('/backend/api/tags', limiter, preventCache, tagRoutes);

app.get('/backend', (req : Request, res : Response) => {
    res.send('Hello from backend route!')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
