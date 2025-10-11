import 'dotenv/config';
import config from "./config/index.js";
import app from './app.js';
import db from './models/index.js';
import { connectDB } from './config/database.js';

const startServer = async () =>{
    await connectDB()
    await db.sync();

    app.listen(config.APP_PORT,()=>{
        console.log(`Server berjalan pada http://${config.APP_HOST+":"+config.APP_PORT}`);
    });
}

startServer();