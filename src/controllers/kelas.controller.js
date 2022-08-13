const { Kelas } = require('@models')
const { NotFound, Forbidden } = require('http-errors')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', Kelas)) {
        return next(Forbidden())
    }
    const result = await Kelas.findAll()
    res.json(result)
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', Kelas)) {
        return next(Forbidden())
    }
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