const { Spp, Pembayaran, Siswa, Petugas } = require('@models')
const { NotFound, Forbidden } = require('http-errors')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', Spp)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [['createdAt', 'ASC']],
        include: [],
        where: {}
    }

    const { tahun, bulan } = req.query

    tahun
        ? options.where.tahun = tahun
        : bulan ? options.where.bulan = bulan
            : null

    const result = await Spp.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', Spp)) {
        return next(Forbidden())
    }
    const result = await Spp.findByPk(req.params.id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', Spp)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await Spp.create(body)
    res.json(result)
}

async function update(req, res, next) {
    let spp = await Spp.findByPk(req.params.id)
    if (!spp) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('update', spp)) {
        return next(Forbidden())
    }

    const result = await spp.update(req.body)
    return res.send({
        message: "Successfully updated kelas",
        fields: req.body,
        result
    })
}

async function remove(req, res, next) {
    let spp = await Spp.findByPk(req.params.id)
    if (!spp) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('delete', spp)) {
        return next(Forbidden())
    }

    try {
        const result = await spp.destroy()
        return res.send({
            message: "Successfully deleted spp",
            data: result
        })
    } catch (error) {
        if (error.original.errno == 1451) {
            return next(Forbidden(
                "Delete action for Spp causing related Pembayaran records gone!"
            ))
        }
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}