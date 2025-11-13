import express from "express";
import validate from "../middlewares/validate.js";
import { createQrcode, registerDevice } from "../validators/deviceValidator.js";
import { addDeviceController, generateQrcodeController } from "../controllers/deviceController.js"
const router = express.Router();

router.post('/',validate(registerDevice), addDeviceController);
router.post('/qrcode',validate(createQrcode), generateQrcodeController);

export default router;