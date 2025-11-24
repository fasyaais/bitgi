import {Router} from "express"
import * as ActuatorController from './../../controllers/admin/actuatorController.js'
import { actuatorSchema, actuatorUpdateSchema } from "../../validators/actuatorValidators.js";
import validate from "../../middlewares/validate.js";
const router = Router()

router.get("/", ActuatorController.index)
router.get("/:id", ActuatorController.show)
router.post("/", validate(actuatorSchema),ActuatorController.store)
router.put("/:id", validate(actuatorUpdateSchema), ActuatorController.update)
router.delete("/:id", ActuatorController.destroy)

export default router
