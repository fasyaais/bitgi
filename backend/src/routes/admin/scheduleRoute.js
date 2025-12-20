import {Router} from "express"
import * as scheduleController from '../../controllers/admin/scheduleController.js'
import validate from "../../middlewares/validate.js";
import { scheduleSchema, scheduleUpdateSchema } from "../../validators/scheduleValidators.js";
const router = Router()

router.get("/", scheduleController.index)
router.get("/:id", scheduleController.show)
router.post("/", validate(scheduleSchema),scheduleController.store)
router.put("/:id", validate(scheduleUpdateSchema), scheduleController.update)
router.delete("/:id", scheduleController.destroy)

export default router
