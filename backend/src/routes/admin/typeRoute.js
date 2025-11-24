import { Router } from "express";
import * as TypeController from "../../controllers/admin/typeController.js";
import validate  from "../../middlewares/validate.js";
import { typeSchema, typeUpdateSchema } from "../../validators/typeValidators.js";

const router = Router();

router.get("/", TypeController.getAllTypes);
router.get("/:id", TypeController.getTypeById);
router.post("/", validate(typeSchema), TypeController.addType);
router.put("/:id", validate(typeUpdateSchema), TypeController.updateType);
router.delete("/:id", TypeController.deleteType);

export default router;
