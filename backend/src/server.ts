import express, {Request, Response} from 'express';
import { sequelize } from "./config/database";
import dotenv from "dotenv"
dotenv.config();

import authRoutes from './routes/auth'
import blogPostRoutes from './routes/blogpostroutes'
import tagRoutes from './routes/tagroutes'
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['https://www.rinkakuworks.com/', 'https://www.blogging-platform.rinkakuworks.com/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

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
app.use('/backend/api', blogPostRoutes);
app.use('/backend/tags', tagRoutes)

app.get('/backend', (req : Request, res : Response) => {
    res.send('Hello from backend route!')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})