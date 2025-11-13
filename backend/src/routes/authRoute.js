import express from 'express';
import validate from '../middlewares/validate.js';
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { loginController, registerController } from "../controllers/authController.js";

const router = express.Router();

router.post('/login',validate(loginSchema),loginController);
router.post('/register',validate(registerSchema),registerController);

export default router ;