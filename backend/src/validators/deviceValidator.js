import Joi from "joi";

const createQrcode = Joi.object({
  device_id: Joi.string().required(),
  token: Joi.string().required(),
});

const registerDevice = Joi.object({
  type: Joi.string().trim().regex(/^\S+$/).required().messages({
      "string.pattern.base": "Device type cannot contain spaces or tabs",
      "any.required": "Device type is required",
      "string.empty": "Device type cannot be empty"
    })
});

const addDevice = Joi.object({
  name: Joi.string().required(),
  device_id: Joi.string().required(),
  token: Joi.string().required(),
});

const updateDevice = Joi.object({
  // user_id: Joi.number().optional(),
  name: Joi.string().optional(),
  token: Joi.string().optional(),
  type: Joi.number().optional(),
  is_online: Joi.boolean().optional(),
  last_seen: Joi.date().optional(),
  qr_code: Joi.string().optional(),
}).min(1);



export { registerDevice, createQrcode, updateDevice,addDevice };
