const Router = require('express').Router()
const LogRequest = require('@middlewares/log-request')
const { login } = require('@controllers/login.controller')

const { LoggerMiddleware } = new LogRequest('LOGIN_ROUTE')

Router
    .post('/', login)

module.exports = { Router, route: '/login' }