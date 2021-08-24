const { fetch } = require('../pg')
const { sign} = require('../../setup/jwt.js')

module.exports = {
    loginController: async (req, res) => {
        try {
            const { user_phone_number, user_password } = req.body
            const data = await fetch(`select * from users where user_phone_number=$1`, user_phone_number)
            if (!data) {
                throw new Error('You are not registrated!')
            }
            else if (user_password != data.user_password) {
                throw new Error('Wrong password')
            }
            else {
                token = sign(data)
                res.send({ message: 'OK', token })
            }
    
        }
        catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }
}