import express from "express";
import validate from "../middlewares/validate.js";
import {registerDevice,updateDevice} from "../validators/deviceValidator.js";
import {addDeviceController,deleteDeviceController,getAllDeviceUserController,getDeviceByIdController,updateDeviceController} from "./../controllers/deviceController.js";
const router = express.Router();

router.get("/", getAllDeviceUserController);
router.get("/:id", getDeviceByIdController);

router.post("/", validate(registerDevice), addDeviceController);
router.put("/:id", validate(updateDevice), updateDeviceController);
router.delete("/:id", deleteDeviceController);

export default router;
