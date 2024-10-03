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

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

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

app.use('/auth', authRoutes);
app.use('/api', blogPostRoutes);
app.use('/tags', tagRoutes)

app.get('/', (req : Request, res : Response) => {
    res.send('Hello, Typescript + Node.js + Express!')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})