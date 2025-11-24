import Joi from "joi";

// CREATE TYPE
export const typeSchema = Joi.object({
  name: Joi.string().regex(/^\S+$/).min(3).required().messages({
    "string.pattern.base": "Type name can't contain whitespace",
    "any.required": "Type name is required",
    "string.min": "Type name must have at least 3 characters",
  }),

  actuator: Joi.array()
    .items(
      Joi.number().optional(),
    )
    .allow(null),

  sensor: Joi.array()
    .items(
      Joi.number().optional(),
    )
    .allow(null),
});

export const typeUpdateSchema = Joi.object({
  name: Joi.string().regex(/^\S+$/).min(3).messages({
    "string.min": "Type name must have at least 3 characters",
  }),

  actuator: Joi.array()
    .items(
      Joi.number().optional(),
    )
    .allow(null),

  sensor: Joi.array()
    .items(
      Joi.number().optional(),
    )
    .allow(null),
}).min(1); // minimal satu field yang di-update
