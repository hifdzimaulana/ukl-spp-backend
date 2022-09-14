const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

var strongPasswordRegExp = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
/**
 * requires minimum of:
 * 8 character length
 * 1 uppercase
 * 1 lowercase
 * 1 numeric
 * 1 special char
 */
var passwordErrorMessage = "Password should contains minimum of 8 characters, an uppercase & lowercase, a number, and 1 special character."

const schema = {
    username: Joi.string().max(15),
    password: Joi.string().regex(strongPasswordRegExp).messages({ "string.pattern.base": passwordErrorMessage }),
    namaPetugas: Joi.string(),
    level: Joi.string().valid('superadmin', 'admin', 'owner'),
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdatePetugasSchema: ValidateSchema(UpdateSchema),
    CreatePetugasSchema: ValidateSchema(CreateSchema)
}