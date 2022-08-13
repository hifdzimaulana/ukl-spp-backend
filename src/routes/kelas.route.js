const Router = require('express').Router()
const { findAll, findById } = require('@controllers/kelas.controller')

Router
    .get('/', findAll)
    .get('/:id', findById)

module.exports = { Router, route: '/kelas' }