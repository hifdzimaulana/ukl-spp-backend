const { Pembayaran } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', Pembayaran)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {}
    }

    const { idPetugas, idSpp, idSiswa, from, until } = req.query

    if (idPetugas) options.where.idPetugas = idPetugas
    if (idSpp) options.where.idSpp = idSpp
    if (idSiswa) options.where.idSiswa = idSiswa

    if (from || until) {
        const OpAnd = {}
        if (from && until) {
            OpAnd[Op.between] = [new Date(from), new Date(until)]
        }
        else {
            from
                ? OpAnd[Op.gte] = new Date(from)
                : OpAnd[Op.lte] = new Date(until)
        }
        options.where.tanggalBayar = OpAnd
    }

    const result = await Pembayaran.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', Pembayaran)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await Pembayaran.findByPk(id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', Pembayaran)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await Pembayaran.create(body)
    res.json(result)
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', Pembayaran)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const result = await Pembayaran.update(body, { where: { id } })
    result[0]
        ? res.json({ message: 'Succesfully updated' })
        : next(NotFound())
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', Pembayaran)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await Pembayaran.destroy({ where: { id } })
    result === 1
        ? res.json({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = { findAll, findById, create, update, remove }