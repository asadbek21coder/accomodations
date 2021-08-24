const { fetch } = require('../pg')
const { sign } = require('../../setup/jwt.js')

module.exports = {
    registrationController:  async (req, res) => {

        try {
            const { user_first_name,
                user_password: plainTextPassword,
                user_last_name,
                user_phone_number,
                user_role
            } = req.body
            const username = user_first_name + ' ' + user_last_name
            user = await fetch(`select * from users where user_phone_number=$1`, user_phone_number)
            if (user) {
                throw new Error('this phone number is already registrated')
            }
    
            if (!username || typeof username !== 'string') {
                return res.json({ status: 'error', error: 'Invalid username' })
            }
    
            if (!plainTextPassword || typeof plainTextPassword !== 'string') {
                return res.json({ status: 'error', error: 'Invalid password' })
            }
    
            if (plainTextPassword.length < 5) {
                return res.json({
                    status: 'error',
                    error: 'Password too small. Should be at least 6 characters'
                })
            }
            data = await fetch(`insert into users
                                    (
                                        user_first_name,
                                        user_last_name,
                                        user_phone_number,
                                        user_password,
                                        user_role
                                        ) values ($1,$2,$3,$4,$5)
            returning *`,
                user_first_name,
                user_last_name,
                user_phone_number,
                plainTextPassword,
                user_role)
            console.log(data)
            token = sign(data)
            //  console.log(token)
    
            res.send({ data, message: 'OK', token })
        }
        catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }
}