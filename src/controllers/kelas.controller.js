const { Kelas } = require('@models')
const { NotFound } = require('http-errors')

async function findAll(req, res) {
    const result = await Kelas.findAll()
    res.json(result)
}

async function findById(req, res, next) {
    const { id } = req.params
    const result = await Kelas.findByPk(id)
    result
        ? res.json(result)
        : next(NotFound())
}

module.exports = {
    findAll,
    findById
}