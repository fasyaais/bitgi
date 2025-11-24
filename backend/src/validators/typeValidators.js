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
      Joi.object({
        name: Joi.string().required().messages({
          "any.required": "Actuator name is required inside actuator list",
        }),
      })
    )
    .allow(null),

  sensor: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "any.required": "Sensor name is required inside sensor list",
        }),
      })
    )
    .allow(null),
});

// UPDATE TYPE (partial update)
export const typeUpdateSchema = Joi.object({
  name: Joi.string().regex(/^\S+$/).min(3).messages({
    "string.min": "Type name must have at least 3 characters",
  }),

  actuator: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
      })
    )
    .allow(null),

  sensor: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
      })
    )
    .allow(null),
}).min(1); // minimal satu field yang di-update
