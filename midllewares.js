const { verify} = require('./setup/jwt.js')

module.exports = {

    adminCheckMidlleware: (req, res, next) => {
        try {
            if (req.headers.token) {
                data = verify(req.headers.token)
                if (data.user_role == 'Admin') {

                    next()
                }
                else {
                    throw new Error('you are not Admin. you are not allowed to get this information')
                }

            }
            else {
                throw new Error(' no token please login or registrate if you didn`t')
            }
        }
        catch (error) {
            res.send(error.message)
            console.log(error.message)
        }

    },

    holdersCheckMidlleware: (req, res, next) => {
        try {
            if (req.headers.token) {
                data = verify(req.headers.token)
                req.headers.data = data
                next()
            }
            else {
                throw new Error(' no token please login or registrate if you didn`t')
            }
        }
        catch (error) {
            res.send(error.message)
            console.log(error.message)
        }

    }

}