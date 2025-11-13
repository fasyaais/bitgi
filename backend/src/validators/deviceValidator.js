import Joi from "joi";

const createQrcode = Joi.object({
    device_id: Joi.string().required(),
    token: Joi.string().required(),
});

const registerDevice = Joi.object({
    type: Joi.string().required(),
});

export {registerDevice,createQrcode};