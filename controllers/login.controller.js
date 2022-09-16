const { Petugas } = require('@models')
const { Unauthorized } = require('http-errors')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const { JWT_SECRET } = process.env


async function login(req, res, next) {
    const petugas = await Petugas.scope('withPassword').findOne({
        where: { username: req.body.username },
        raw: true
    })

    const isMatched = await bcrypt.compare(req.body.password, petugas.password)
    if (!isMatched) {
        return next(Unauthorized("Invalid credentials"))
    }

    const token = jsonwebtoken.sign(petugas, JWT_SECRET, { expiresIn: '3d' })
    return res.send({
        loggedIn: true,
        token
    })
}

module.exports = { login }