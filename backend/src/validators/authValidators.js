import Joi from "joi";

const registerSchema = Joi.object({
    fullname: Joi.string().min(6).required().messages({
        'any.required' : "fullname is required ",
        'string.min' : "fullname must have at least 6 characters ",
    }),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only' : "Password do not match",
        "any.required" : 'Repeat Password is required' 
    })
})
    .with('password','repeat_password');

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export {
    registerSchema,
    loginSchema
}