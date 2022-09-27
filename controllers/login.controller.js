const { Petugas } = require('@models')
const { Unauthorized } = require('http-errors')
const { generateToken } = require('@utils/credential-generators')
const bcrypt = require('bcrypt')

async function login(req, res, next) {
    const petugas = await Petugas.scope('withPassword').findOne({
        where: { username: req.body.username },
        raw: true
    })

    if (!petugas) {
        return next(Unauthorized("Invalid credentials"))
    }

    const isMatched = await bcrypt.compare(req.body.password, petugas.password)
    if (!isMatched) {
        return next(Unauthorized("Invalid credentials"))
    }

    delete petugas.password

    return res.send({
        loggedIn: true,
        accessToken: await generateToken(petugas)
    })
}

module.exports = { login }