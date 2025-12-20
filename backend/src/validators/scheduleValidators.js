import Joi from "joi";

export const scheduleSchema = Joi.object({
  device_id: Joi.string().required().messages({
    "any.required": "Device ID is required"
  }),
  label: Joi.string().min(3).required().messages({
    "string.min": "Label must have at least 3 characters",
    "any.required": "Label is required"
  }),
  time: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'Format time has HH:mm',
      'any.required': "Time is required"
    }),
  is_active: Joi.boolean().optional(),
  duration: Joi.number().min(15000).required().messages({
    "any.required": "Duration is required",
    "number.min" : "Duration must be at least 15000 ms"
  }),
});

export const scheduleUpdateSchema = scheduleSchema.fork(
  ['device_id'], 
  (schema) => schema.forbidden()
).fork(
  ['label', 'is_active', 'duration','time'], 
  (schema) => schema.optional()
);