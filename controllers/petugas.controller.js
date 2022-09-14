const { Forbidden, NotFound } = require('http-errors')
const { Petugas } = require('@models')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', Petugas)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [['createdAt', 'ASC']],
        where: {}
    }

    const { level, username, namaPetugas } = req.query
    if (level) {
        options.where['level'] = level
    }
    if (username) {
        options.where['username'] = { [Op.like]: `%${username}%` }
    }
    if (namaPetugas) {
        options.where['namaPetugas'] = { [Op.like]: `%${namaPetugas}%` }
    }

    const result = await Petugas.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.send({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', Petugas)) {
        return next(Forbidden())
    }
    const relations = []
    if (req.query.getPembayaran === 'true') {
        relations.push('pembayaran')
    }
    const petugas = await Petugas.findByPk(req.params.id, { include: relations })
    petugas
        ? res.send(petugas)
        : next(NotFound())
}

async function store(req, res, next) {
    if (req.user.abilities.cannot('create', Petugas)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await Petugas.create(body)
    res.send(result)
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', Petugas)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const result = await Petugas.update(body, { where: { id } })
    result[0]
        ? res.send({ message: "Succesfully updated" })
        : next(NotFound())
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', Petugas)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await Petugas.destroy({ where: { id } })
    result === 1
        ? res.send({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    store,
    update,
    remove
}