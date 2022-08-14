const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const { findAll, findById } = require('@controllers/kelas.controller')

const { getLogger } = require('@utils/logger')

const logger = getLogger('KELAS_ROUTE')

Router
    .use(AuthGuard)
    .use((req, _res, next) => {
        logger.info(`[${req.method}] ${req.originalUrl} Incoming request ...`)
        next()
    })
    .get('/', findAll)
    .get('/:id', findById)

module.exports = { Router, route: '/kelas' }