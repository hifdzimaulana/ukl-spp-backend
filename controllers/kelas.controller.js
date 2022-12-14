const { Kelas } = require('@models')
const { NotFound, Forbidden } = require('http-errors')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', Kelas)) {
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

    const { jurusan } = req.query

    if (jurusan) {
        options.where['jurusan'] = jurusan
    }

    const result = await Kelas.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', Kelas)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { getSiswa } = req.query
    const options = {
        include: []
    }
    if (getSiswa == 'true') options.include.push('siswa')
    const result = await Kelas.findByPk(id, options)
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
    let kelas = await Kelas.findByPk(req.params.id)
    if (!kelas) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('update', kelas)) {
        return next(Forbidden())
    }

    const result = await kelas.update(req.body)
    return res.send({
        message: "Successfully updated kelas",
        fields: req.body,
        result
    })
}

async function remove(req, res, next) {
    let kelas = await Kelas.findByPk(req.params.id)
    if (!kelas) {
        return next(NotFound())
    } else if (req.user.abilities.cannot('delete', kelas)) {
        return next(Forbidden())
    }

    const result = await kelas.destroy()
    return res.send({
        message: "Successfully deleted kelas",
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