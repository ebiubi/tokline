const jwt = require('jsonwebtoken')
const {verifyJwt} = require('../config/utils')

module.exports = (req,res,next) => {
    try {
        // console.log("masuk")
        const token = req.headers.authorization.split(' ')[1]
        // console.log("token", token, verifyJwt(token))
        verifyJwt(token)
        next()
    } catch (error) {
        console.log(error)
    }
}