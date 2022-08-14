const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')
const { findAll, findById } = require('@controllers/kelas.controller')

const { LoggerMiddleware } = new LogRequest('KELAS_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)

module.exports = { Router, route: '/kelas' }