const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const { findAll, findById } = require('@controllers/kelas.controller')

Router
    .get('/', findAll)
    .get('/:id', AuthGuard, findById)

module.exports = { Router, route: '/kelas' }