import express from "express";
import validate from "../middlewares/validate.js";
import * as ScheduleController from './../controllers/scheduleController.js'
import { scheduleSchema, scheduleUpdateSchema } from "../validators/scheduleValidators.js";

const router = express.Router();

router.get("/", ScheduleController.index);
router.get("/:id", ScheduleController.show);

router.post("/", validate(scheduleSchema), ScheduleController.add);
router.put("/:id", validate(scheduleUpdateSchema), ScheduleController.update);
router.delete("/:id", ScheduleController.destroy);

export default router;
