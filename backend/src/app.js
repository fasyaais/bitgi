import express from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';

import authRouter from "./routes/authRoute.js"

const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/v1",authRouter);
app.get('/test',authMiddleware,(req,res)=> {
    res.send('Hello');
});

export default app;