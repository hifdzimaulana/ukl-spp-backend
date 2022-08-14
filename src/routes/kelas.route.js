const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')
const { findAll, findById, create, update } = require('@controllers/kelas.controller')

const { LoggerMiddleware } = new LogRequest('KELAS_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', create)
    .patch('/:id', update)
    .get('/', findAll)
    .get('/:id', findById)

module.exports = { Router, route: '/kelas' }