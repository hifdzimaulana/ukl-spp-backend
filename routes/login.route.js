const Router = require('express').Router()
const LogRequest = require('@middlewares/log-request')
const { login } = require('@controllers/login.controller')

const { LoggerMiddleware } = new LogRequest('LOGIN_ROUTE')
const LoginSchema = require('@validations/login.schema')

Router
    .use(LoggerMiddleware)
    .post('/', LoginSchema, login)

module.exports = { Router, route: '/login' }