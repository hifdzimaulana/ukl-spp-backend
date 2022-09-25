const { Forbidden, NotFound } = require('http-errors')
const { Petugas } = require('@models')
const { Op } = require('sequelize')
const { generateHashedPassword } = require('@utils/credential-generators')

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
    const { abilities } = req.user
    let petugas = await Petugas.findByPk(req.params.id)
    if (!petugas) {
        return next(NotFound())
    } else if (abilities.cannot('update', petugas) || (req.body['level'] && abilities.cannot('update', petugas, 'level'))) {
        return next(Forbidden())
    }

    const result = await petugas.update(req.body)
    return res.send({
        message: "Successfully updated petugas",
        fields: req.body,
        result
    })
}

async function changePassword(req, res, next) {
    const { abilities } = req.user
    let petugas = await Petugas.findByPk(req.params.id)
    if (!petugas) {
        return next(NotFound())
    } else if (abilities.cannot('update', petugas)) {
        return next(Forbidden())
    }

    const password = await generateHashedPassword(req.body.password)

    const result = await petugas.update({ password })
    return res.send({ ...result.get({ plain: true }), body: req.body })
}

async function remove(req, res, next) {
    let petugas = await Petugas.findByPk(req.params.id)
    if (!petugas) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('delete', petugas)) {
        return next(Forbidden())
    }

    const result = await petugas.destroy()
    return res.send({
        message: "Successfully deleted petugas",
        data: result
    })
}

module.exports = {
    findAll,
    findById,
    store,
    update,
    changePassword,
    remove
}