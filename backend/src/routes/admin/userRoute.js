import express from "express";
import validate from "../../middlewares/validate.js";
import {
  deleteUsersController,
  getAllUsersController,
  updateUsersController,
} from "../../controllers/usersController.js";
import { registerSchema } from "../../validators/authValidators.js";

const router = express.Router();

router.get("/all", getAllUsersController);

router.put("/:id", validate(registerSchema), updateUsersController);
router.delete("/:id", deleteUsersController);

export default router;
