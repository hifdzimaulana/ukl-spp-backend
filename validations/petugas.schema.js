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
    password: {
        password: Joi.string().regex(strongPasswordRegExp).messages({ "string.pattern.base": passwordErrorMessage }),
    },
    petugas: {
        username: Joi.string().max(15),
        namaPetugas: Joi.string(),
        level: Joi.string().valid('superadmin', 'admin', 'owner'),
    }
}

const mergedSchema = { ...schema.petugas, ...schema.password }

const CreateSchema = Joi.object(mergedSchema).fork(Object.keys(mergedSchema), field => field.required())
const UpdateSchema = Joi.object(schema.petugas)
const ChangePasswordSchema = Joi.object(schema.password).fork(['password'], field => field.required())

module.exports = {
    UpdatePetugasSchema: ValidateSchema(UpdateSchema),
    CreatePetugasSchema: ValidateSchema(CreateSchema),
    ChangePasswordSchema: ValidateSchema(ChangePasswordSchema)
}