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
                const token = socket.handshake.auth?.token;
                const decode = verifyToken(token);
                const userId = decode.id
                const user = await db.User.findByPk(userId);
                if(!user){
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
            console.log(`[WS] User ${socket.userId} connected`);
            // socket.join(`user:${socket.userId}`);

            socket.on("join", (roomName) => {
                if(roomName.startsWith("device:")){
                    const deviceId = roomName.split(":")[1];
                    db.Device.findOne({where:{id: deviceId,user_id: socket.userId}})
                        .then(device => {
                            if(!device) {
                                socket.emit("error",{message:"Device not found or unauthorized"});
                                return;
                            }
                            
                            socket.join(roomName);
                            socket.emit("joined",roomName);
                        }).catch(err => {
                            socket.emit("error",{message:"Server error"});
                        });
                } else if(roomName.startsWith("sensor:")){
                    console.info(roomName);
                    const parts =roomName.split(":")
                    const deviceId = parts[1];
                    db.Device.findOne({ where: { id: deviceId, user_id: socket.userId } })
                        .then(device => {
                        if (!device) return socket.emit("error", { message: "Unauthorized" });
                        socket.join(roomName);
                        socket.emit("joined", roomName);
                        }).catch(() => socket.emit("error", { message: "Server error" }));
                }else{
                    socket.join(roomName);
                    socket.emit("joined", roomName);
                }   
            });

            socket.on("leave", (roomName) => {
                socket.leave(roomName);
                socket.emit("left", roomName);
            });

            socket.on("control-actuator", async ({ deviceId, actuator, command }) => {
                try {
                    const device = await db.Device.findOne({ where: { id: deviceId, user_id: socket.userId } });
                    if (!device) {
                        return socket.emit("error", { message: "Device not found or unauthorized" });
                    }
                    this.mqttService.publishControl(deviceId, actuator, command);

                    socket.emit("control-sent", { deviceId, actuator, command });
                } catch (err) {
                    console.error("control-actuator error:", err);
                    socket.emit("error", { message: "Failed to send control command" });
                }
            });

            
            socket.on("disconnect",() => {
                this.__disconnectUserSockets(socket,socket.userId);
            });
        });
    }

    __disconnectUserSockets(socket, userId){
        if(this.userSockets.has(userId)){
            this.userSockets.get(userId).delete(socket.id);
            if(this.userSockets.get(userId).size === 0){
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