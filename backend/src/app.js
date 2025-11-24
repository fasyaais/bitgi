import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "url";

import config from "./config/index.js";

import authRouter from "./routes/authRoute.js";

import userDeviceRoute from "./routes/deviceRoute.js";

import adminDeviceRoute from "./routes/admin/deviceRoute.js";
import adminUserRoute from "./routes/admin/userRoute.js";
import adminActuatorRoute from "./routes/admin/actuatorRoute.js";
import adminSensorRoute from "./routes/admin/sensorRoute.js";
import adminTypeRoute from "./routes/admin/typeRoute.js";

import authMiddleware from "./middlewares/authMiddleware.js";
import checkRoleMiddleware from "./middlewares/checkRoleMiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: [
    config.FRONTEND_URL,
    "http://localhost:5173",
    "https://frontend-iot-theta.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", authRouter);

const privateRouter = express.Router();
privateRouter.use(authMiddleware);

privateRouter.use(
  "/user/devices",
  checkRoleMiddleware("user"),
  userDeviceRoute
);


privateRouter.use(
  "/admin/devices",
  checkRoleMiddleware("admin"),
  adminDeviceRoute
);

privateRouter.use(
  "/admin/users",
  checkRoleMiddleware("admin"),
  adminUserRoute
);

privateRouter.use(
  "/admin/actuators",
  checkRoleMiddleware("admin"),
  adminActuatorRoute
);

privateRouter.use(
  "/admin/sensors",
  checkRoleMiddleware("admin"),
  adminSensorRoute
);

privateRouter.use(
  "/admin/types",
  checkRoleMiddleware("admin"),
  adminTypeRoute
);

app.use("/api/v1", privateRouter);


export default app;
