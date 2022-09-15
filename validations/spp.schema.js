const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    bulan: Joi.number().max(12),
    tahun: Joi.number(),
    nominal: Joi.number(),
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateSppSchema: ValidateSchema(UpdateSchema),
    CreateSppSchema: ValidateSchema(CreateSchema)
}