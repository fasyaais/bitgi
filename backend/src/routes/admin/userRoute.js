import express from "express";
import validate from "../../middlewares/validate.js";
import {
  createUsersController,
  deleteUsersController,
  getAllUsersController,
  getUserController,
  updateUsersController,
} from "../../controllers/admin/usersController.js";
import { registerSchema } from "../../validators/authValidators.js";

const router = express.Router();

router.get("/", getAllUsersController);
router.get("/:id",getUserController);
router.post("/",validate(registerSchema), createUsersController);
router.put("/:id", validate(registerSchema), updateUsersController);
router.delete("/:id", deleteUsersController);

export default router;
