import Joi from "joi";

// CREATE SENSOR
export const sensorSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "Sensor name is required",
    "string.min": "Sensor name must have at least 3 characters",
  }),
});

// UPDATE SENSOR
export const sensorUpdateSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.min": "Sensor name must have at least 3 characters",
  }),
}).min(1);
