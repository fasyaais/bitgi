import { Sequelize  } from "sequelize";
import config from './../config/index.js'

const sequelize = new Sequelize(
    config.DB_NAME, 
    config.DB_USER,
    config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: config.DB_CONNECTION
});

async function connectDB(){
    try {
        sequelize.authenticate();
        console.info(`[DB] ${config.DB_CONNECTION} connection established successfullty`);
    } catch (error) {
        console.error('[DB] Unable to connect to the database:', error);
        process.exit(1);
    }
}

export {sequelize, connectDB};