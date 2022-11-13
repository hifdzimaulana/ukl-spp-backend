const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const LoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

module.exports = ValidateSchema(LoginSchema)
