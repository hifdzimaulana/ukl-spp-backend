const { Siswa } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', Siswa)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {}
    }

    const { alamat } = req.query

    if (alamat) {
        options.where['alamat'] = {
            [Op.like]: `%${alamat}%`
        }
    }

    const result = await Siswa.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', Siswa)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { getPembayaran, getKelas } = req.query
    const option = {
        include: []
    }
    if (getPembayaran == 'true') option.include.push('pembayaran')
    if (getKelas == 'true') option.include.push('kelas')
    const result = await Siswa.findByPk(id, option)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', Siswa)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await Siswa.create(body)
    res.json(result)
}

async function update(req, res, next) {
    let siswa = await Siswa.findByPk(req.params.id)
    if (!siswa) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('update', siswa)) {
        return next(Forbidden())
    }

    const result = await siswa.update(req.body)
    return res.send({
        message: "Successfully updated kelas",
        fields: req.body,
        result
    })
}

async function remove(req, res, next) {
    let siswa = await Siswa.findByPk(req.params.id)
    if (!siswa) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('delete', siswa)) {
        return next(Forbidden())
    }

    const result = await siswa.destroy()
    return res.send({
        message: "Successfully deleted siswa",
        data: result
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}