import { Server } from "socket.io";
import config from "../config/index.js";
import db from "../models/index.js";
import { verifyToken } from "../utils/jwtUtil.js";

class SocketService {
    constructor(httpServer){
        this.io = new Server(httpServer,{
            cors : {
                origin: ['*'],
                methods: ["GET","POST"]
            },
        });
        this.userSockets = new Map();
    }

    init(){
        this.__authMiddleware();
        this.__connectionHandler();
    }

    __authMiddleware(){
        this.io.use(async (socket,next) => {
            try {
                const token = socket.handshake.headers.authorization;
                const decode = verifyToken(token);
                const userId = decode.id
                const user = await db.User.findByPk(userId);
                if(user == null){
                    throw new Error("Authentication error");
                }
                socket.userId = userId;
                return next();
            } catch (error) {
                next(error);
            }
        });
    }

    __connectionHandler(){
        this.io.on("connection", async (socket) => {
            console.log(`User connected: ${socket.userId}`);
            if(!this.userSockets.has(socket.userId)){
                this.userSockets.set(socket.userId,new Set());
            }
            this.userSockets.get(socket.userId).add(socket.id);
            socket.on("disconnect",() => {
                this.__disconnectUserSockets(socket,socket.userId);
            });
        });
    }

    __disconnectUserSockets(socket, userId){
        if(this.userSockets.has(userId)){
            this.userSockets.get(userId).delete(socket.id);
            if(!this.userSockets.get(userId).size === 0){
                this.userSockets.delete(userId);
            }
        }
        console.log(`Socket ${socket.id} disconnected. User ${userId} have a total of ${this.userSockets.get(userId)?.size || 0} connections left.`);

    }
    getIO(){
        return this.io;
    }
}

export default SocketService;