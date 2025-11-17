import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRouter from "./routes/authRoute.js";
import deviceRoute from "./routes/deviceRoute.js";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const __dirname = path.join(currentDir, "..");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", authRouter);
app.use("/api/v1/devices", deviceRoute);
app.get("/test", authMiddleware, (req, res) => {
  console.log(req.userId);
  return res.json({
    message: "success",
  });
});

export default app;
