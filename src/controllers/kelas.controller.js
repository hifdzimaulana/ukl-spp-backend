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

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', Kelas)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await Kelas.create(body)
    res.json(result)
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', Kelas)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const result = await Kelas.update(body, { where: { id } })
    result[0]
        ? res.json({ message: 'Succesfully updated' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
}