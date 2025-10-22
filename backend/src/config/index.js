const config =  {
    "APP_NAME": process.env.APP_NAME || "Bitgi",
    "APP_HOST": process.env.APP_HOST || "localhost",
    "APP_PORT": process.env.APP_PORT || "8000",
    "APP_SECRET_KEY": process.env.APP_SECRET_KEY || "1CIT_K3333eY",
    "FRONTEND_URL": process.env.FRONTEND_URL || "http://127.0.0.1:5173",

    "DB_CONNECTION": process.env.DB_CONNECTION || "mysql",
    "DB_HOST": process.env.DB_HOST || "localhost",
    "DB_PORT": process.env.DB_PORT || 3306,
    "DB_USER": process.env.DB_USER || "root",
    "DB_PASSWORD": process.env.DB_PASSWORD || "",
    "DB_NAME": process.env.DB_NAME || "iot_bitgi",
    
    "MQTT_URL": process.env.MQTT_URL || "",
    "MQTT_PORT": process.env.MQTT_PORT || 8886,
    "MQTT_PROTOCOL": process.env.MQTT_PROTOCOL || "mqtts",
    "MQTT_USERNAME": process.env.MQTT_USERNAME || "",
    "MQTT_PASSWORD": process.env.MQTT_PASSWORD || "",
};

export default config;