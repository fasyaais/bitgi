import express from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express()

app.use(cors());
app.use(express.json());

app.get('/test',authMiddleware,(req,res)=> {
    res.send('Hello');
});

export default app;