const jwt = require('jsonwebtoken')
const secretkey = 'secretKey'

let sign = (payload) => jwt.sign(payload, secretkey) 
let verify = (token) => jwt.verify(token, secretkey) 

module.exports = {sign, verify}