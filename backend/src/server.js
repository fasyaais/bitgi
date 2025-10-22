import 'dotenv/config';
import config from "./config/index.js";
import app from './app.js';
import db from './models/index.js';
import { connectDB } from './config/database.js';
import { createServer } from "node:http";
import SocketService from './services/SocketService.js';

const server = createServer(app);

const startServer = async () =>{
    await connectDB()
    await db.sync();
    const socketService = new SocketService(server);
    socketService.init();
    const io = socketService.getIO();

    server.listen(config.APP_PORT,()=>{
        console.log(`Server running on http://${config.APP_HOST+":"+config.APP_PORT}`);
    });
}

startServer();