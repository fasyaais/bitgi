import express from "express";
import validate from "../../middlewares/validate.js";
import {
  createQrcode,
  registerDevice,
  updateDevice,
} from "../../validators/deviceValidator.js";
import {
  addDeviceController,
  generateQrcodeController,
  getAllDevicesController,
  getDeviceByIdController,
  updateDeviceController,
  deleteDeviceController,
} from "../../controllers/admin/deviceController.js";
const router = express.Router();

router.post("/", validate(registerDevice), addDeviceController);
router.post("/qrcode", validate(createQrcode), generateQrcodeController);

router.get("/", getAllDevicesController);
router.get("/:id", getDeviceByIdController);
router.put("/:id", validate(updateDevice), updateDeviceController);
router.delete("/:id", deleteDeviceController);

export default router;
