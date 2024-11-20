import express, {Request, Response} from 'express';
import { sequelize } from "./config/database";
import { limiter } from "./middleware/rateLimit";
import dotenv from "dotenv"
dotenv.config();

import authRoutes from './routes/auth'
import blogPostRoutes from './routes/blogpostroutes'
import tagRoutes from './routes/tagroutes'
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    if (req.method === 'GET' && req.headers.origin === 'https://www.rinkakuworks.com') {
        cors({
            origin: 'https://www.rinkakuworks.com',
            methods: ['GET'],
            credentials: false
        })(req, res, next);
    } else {
        cors({
            origin: 'https://www.blogging-platform.rinkakuworks.com',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true
        })(req, res, next);
    }
});


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
app.use('/backend/api', limiter, blogPostRoutes);
app.use('/backend/tags', limiter, tagRoutes)

app.get('/backend', (req : Request, res : Response) => {
    res.send('Hello from backend route!')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})