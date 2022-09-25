const jsonwebtoken = require('jsonwebtoken')

const { JWT_SECRET, BCRYPT_SALT } = process.env
const { hash, genSalt } = require('bcrypt')

function generateToken(payload) {
    return new Promise((resolve, reject) => {
        try {
            const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '3d' })
            resolve(token)
        } catch (error) {
            reject(error)
        }
    })
}

function generateHashedPassword(password) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await hash(password, await genSalt(Number(BCRYPT_SALT)))
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { generateToken, generateHashedPassword }