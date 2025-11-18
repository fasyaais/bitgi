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
} from "../../controllers/deviceController.js";
const router = express.Router();

router.post("/", validate(registerDevice), addDeviceController);
router.post("/qrcode", validate(createQrcode), generateQrcodeController);

router.get("/all", getAllDevicesController);
router.get("/:id", getDeviceByIdController);
// update device
router.put("/:id", validate(updateDevice), updateDeviceController);
//hapus device
router.delete("/:id", deleteDeviceController);

export default router;
