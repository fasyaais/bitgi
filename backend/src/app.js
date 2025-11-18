import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRouter from "./routes/authRoute.js";
import deviceRouteAdmin from "./routes/admin/deviceRoute.js";
import deviceRoute from "./routes/deviceRoute.js";
import userRouteAdmin from "./routes/admin/userRoute.js";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "url";
import config from "./config/index.js";
import checkRoleMiddleware from "./middlewares/checkRoleMiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const __dirname = path.join(currentDir, "..");

app.use(cors({
  origin:[
    config.FRONTEND_URL,
    "http://localhost:5173",
    "https://frontend-iot-theta.vercel.app/"
  ]
}));

app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", authRouter);

const router = express.Router();
router.use(authMiddleware);

// USER ROUTES
router.use("/devices", checkRoleMiddleware("user"), deviceRoute);

// ADMIN ROUTES
router.use("/admin/devices",checkRoleMiddleware("admin"), deviceRouteAdmin);
router.use("/admin/users",checkRoleMiddleware("admin"), userRouteAdmin);

// PREFIX API VERSION
app.use("/api/v1",router);

export default app;
