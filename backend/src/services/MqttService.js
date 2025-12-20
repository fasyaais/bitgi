import mqtt from 'mqtt'
import config from '../config/index.js';
import db from '../models/index.js';
import { timeStamp } from 'node:console';
class MqttService {
    constructor(io){
        this.io = io;
        const url = `${config.MQTT_PROTOCOL}://${config.MQTT_URL}`;
        this.client = mqtt.connect(url,{
            username: config.MQTT_USERNAME,
            password: config.MQTT_PASSWORD
        });

        this.client.subscribe('device/+/+/+');
        this.client.subscribe('device/+/actuator/+/status');
    }

    init(){
        this.client.on("message", async (topic, message) => {
            try {
                const payload = JSON.parse(message.toString());
                const parts = topic.split("/");
                if (parts.length < 4) return;

                const deviceId = parts[1];
                const level = parts[2];
                const type = parts[3];

                const device = await db.Device.findByPk(deviceId);
                if(!device){
                    console.log("[MQTT] Device not found ", deviceId);
                    socket.emit("error", { message: "Device not found " + deviceId });
                }

                const userId = device.user_id;
                const basePayload = {
                    deviceId,
                    userId,
                    level,
                    type,
                    payload,
                    timestamp : new Date()
                }
                
                this.io.to(`user:${userId}`).emit("sensor:update",basePayload);
                this.io.to(`device:${deviceId}`).emit(`sensor:update`,basePayload);
                if(level == "sensor") {
                    this.io.to(`sensor:${deviceId}:${type}`).emit("sensor:update",basePayload);
                } else if(level == "actuator"){
                    this.io.to(`actuator:${deviceId}:${type}`).emit("actuator:status",basePayload);
                }
                console.log("[MQTT] forwarded topic ",topic);
            } catch (error) {
                console.log("[MQTT] Error handling mqtt message ", error);
            }
        });
    }

    publishControl(deviceId, actuator,command){
        const topic = `device/${deviceId}/actuator/${actuator}/command`;
        this.client.publish(topic,JSON.stringify(command));
    }
}

export default MqttService