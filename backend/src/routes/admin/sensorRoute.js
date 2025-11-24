import { Router } from "express"
import * as SensorController from "../../controllers/admin/sensorController.js"
import validate from "../../middlewares/validate.js"
import { sensorSchema, sensorUpdateSchema } from "../../validators/sensorValidators.js";

const router = Router()

router.get("/", SensorController.index)
router.get("/:id", SensorController.show)
router.post("/", validate(sensorSchema),SensorController.store)
router.put("/:id", validate(sensorUpdateSchema),SensorController.update)
router.delete("/:id", SensorController.destroy)

export default router
