import Joi from "joi";

// CREATE ACTUATOR
export const actuatorSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "Actuator name is required",
    "string.min": "Actuator name must have at least 3 characters",
  }),
});

// UPDATE ACTUATOR
export const actuatorUpdateSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.min": "Actuator name must have at least 3 characters",
  }),
}).min(1);
