import Joi from "joi";

// CREATE SENSOR
export const sensorSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "Sensor name is required",
    "string.min": "Sensor name must have at least 3 characters",
  }),
  topic: Joi.string().regex(/^[a-z-]+$/).min(3).required().messages({
    "string.pattern.base" : "topic only contain lowercase letter and dash",
    "any.required": "topic is required",
    "string.min": "topic must have at least 3 characters",
  })
});

// UPDATE SENSOR
export const sensorUpdateSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.min": "Sensor name must have at least 3 characters",
  }),
  topic: Joi.string().regex(/^[a-z-]+$/).min(3).required().messages({
    "string.pattern.base" : "topic only contain lowercase letter and dash",
    "any.required": "topic is required",
    "string.min": "topic must have at least 3 characters",
  })
}).min(1);
