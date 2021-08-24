const {  fetchall } = require('../pg')


module.exports = {
    dashboardController:   async (req,res) => {    
        const users = await fetchall(`select * from users`)
        const justHolders = await fetchall (`select * from users where user_role=$1`, 'Holder')
        const justStudents = await fetchall (`select * from users where user_role=$1`, 'Student')
        
        res.send({users, justHolders, justStudents})
    
    } 
}