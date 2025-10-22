import express from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';
import authRouter from "./routes/authRoute.js"
import morgan from "morgan";

const app = express()

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1",authRouter);
app.get('/test',authMiddleware,(req,res)=> {
    console.log(req.userId);
    return res.json({
        message:'success'
    })
});

export default app;