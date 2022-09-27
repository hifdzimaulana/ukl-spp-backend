const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, store, update, remove, changePassword } = require('@controllers/petugas.controller')
const { UpdatePetugasSchema, CreatePetugasSchema, ChangePasswordSchema } = require('@validations/petugas.schema')

const { LoggerMiddleware } = new LogRequest('PETUGAS_ROUTE')

Router.get('/asdf', (req, res) => res.send('ok'))
Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', CreatePetugasSchema, store)
    .patch('/:id', UpdatePetugasSchema, update)
    .patch('/:id/change-password', ChangePasswordSchema, changePassword)
    .delete('/:id', remove)

module.exports = { Router, route: '/petugas' }