import mqtt from 'mqtt'
import config from '../config';
import db from '../models';
class MqttService {
    constructor(io){
        this.io = io;
        const url = `${config.MQTT_PROTOCOL}://${config.MQTT_URL}`
        this.client = mqtt.connect(config.MQTT_URL,{
            username: config.MQTT_USERNAME,
            password: config.MQTT_PASSWORD
        })
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

                const device = db.Device.findByPk(deviceId);
                if(!device){
                    console.log("[MQTT] Device not found ", deviceId);
                }

                const userId = device.user_id;
                const basePayload = {
                    deviceId,
                    userId,
                    level,
                    type,
                    payload
                }

                this.io.to(`user:${userId}`).emit("sensor:update",basePayload);
                this.io.to(`device:${deviceId}`).emit(`sensor:update`,basePayload);
                if(level == "sensor") {
                    this.io.to(`sensor:${deviceId}:${type}`).to("sensor:update",basePayload);
                } else if(level == "actuator"){
                    this.io.to(`actuator:${deviceId}:${type}`).emit("actuator:status",basePayload);
                }

                console.log("[MQTT] forwarded topic ",topic);
            } catch (error) {
                console.log("[MQTT] Error handling mqtt message ", error);
            }
        });
    }
}