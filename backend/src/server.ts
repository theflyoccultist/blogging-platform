import express, {Request, Response} from 'express';
import dotenv from "dotenv"
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req : Request, res : Response) => {
    res.send('Hello, Typescript + Node.js + Express!')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})