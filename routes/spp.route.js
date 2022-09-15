const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/spp.controller')
const { UpdateSppSchema, CreateSppSchema } = require('@validations/spp.schema')

const { LoggerMiddleware } = new LogRequest('SISWA_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', CreateSppSchema, create)
    .patch('/:id', UpdateSppSchema, update)
    .delete('/:id', remove)

module.exports = { Router, route: '/spp' }