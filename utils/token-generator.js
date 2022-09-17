const jsonwebtoken = require('jsonwebtoken')

const { JWT_SECRET } = process.env

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

module.exports = { generateToken }