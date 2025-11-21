import Joi from "joi";

const createQrcode = Joi.object({
  device_id: Joi.string().required(),
  token: Joi.string().required(),
});

const registerDevice = Joi.object({
  type: Joi.string().required(),
});

const addDevice = Joi.object({
  name: Joi.string().required(),
  user_id: Joi.number().required(),
  device_id: Joi.string().required(),
  token: Joi.string().required(),
});

const updateDevice = Joi.object({
  user_id: Joi.number().optional(),
  name: Joi.string().optional(),
  token: Joi.string().optional(),
  type: Joi.number().optional(),
  is_online: Joi.boolean().optional(),
  last_seen: Joi.date().optional(),
  qr_code: Joi.string().optional(),
}).min(1);



export { registerDevice, createQrcode, updateDevice,addDevice };
