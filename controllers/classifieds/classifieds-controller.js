const { fetch, fetchall } = require('../pg.js')
const path = require('path')


module.exports = {
    GET: async (req, res) => {

        try {
            classified_id = req.params.id
            if (!classified_id) {

                const classifieds = await fetchall(`
                select
                    classified_id,
                    monthly_price,
                    max_students,
                    room_count,
                    image_url,
                    address,
                    classified_created_at 
                from
                    classified`)
                res.send(classifieds)
            }

            else {
                const classified = await fetch(`select * from classified where 
            classified_id=$1`, classified_id)


                if (classified) {
                    const { classified_id: classifiedId,
                        holder_id: holderId,
                        state_id: stateId,
                        monthly_price: monthlyPrice,
                        max_students: maxStudents,
                        room_count: roomCount,
                        image_url: imageUrl,
                        address,
                        classified_created_at: createdAt

                    } = await classified
                    const { user_first_name: userFirstName,
                        user_last_name: userLastName,
                        user_phone_number: userPhoneNumber
                    } = await fetch(`
                select 
                    user_first_name,
                    user_last_name,
                    user_phone_number 
                from users where id=$1`, holderId)

                    const { name: stateName } = await fetch(`select name from state where id=$1`, stateId)
                    // console.log(classified)
                    res.send({
                        classifiedId,
                        state: stateName,
                        monthlyPrice,
                        maxStudents,
                        roomCount,
                        imageUrl,
                        address,
                        holder: {
                            name: userFirstName + ' ' + userLastName,
                            phoneNumber: userPhoneNumber,
                        },
                        createdAt
                    })
                }
                else {
                    throw new Error('No such classified')
                }
            }
        }
        catch (error) {
            console.log(error.message)
            res.status(404).send({ message: error.message })

        }

    },
    POST: async (req, res) => {

        const {
            state_id: stateId,
            condition,
            monthly_price: monthlyPrice,
            max_students: maxStudents,
            room_count: roomCount,
            additional_info: additionalInfo,
            address
        } = await req.body
        const holderId = await req.headers.data.id

        console.log(req.files)

        let sampleFile = req.files.sampleFile
        let uploadPath = path.join(__dirname, '../../upload/', sampleFile.name)
        console.log(uploadPath)
        sampleFile.mv(uploadPath, (err) => {
            if (err) {
                console.log(err)
                // return res.status(500).send(err)
            }
        })
        const readyData = await fetch(`
        insert into classified (
            holder_id,
            state_id,
                condition,
                image_url,
                monthly_price,
                max_students,
                room_count,
                additional_info,
                address
                ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)        
                returning *`, holderId, stateId, condition, uploadPath, monthlyPrice, maxStudents, roomCount, additionalInfo, address)




        res.send('OK')

    },
    PUT: async (req, res) => {
        const { id, state_id, condition, image_url, monthly_price,
            max_students, room_count, additional_info, address
        } = req.body
        try {
            const data = await fetch(`select * from classified where classified_id=$1`, id)
            if (!data) {
                throw new Error('No such classified')
            }

            if (data.holder_id == req.headers.data.id) {
                const readyData = await fetch(`update classified set
                                                     state_id=$2,
                                                     condition=$3,
                                                     image_url=$4,
                                                     monthly_price=$5,
                                                     max_students=$6,
                                                     room_count=$7,
                                                     additional_info=$8,
                                                     address=$9
                where
             classified_id=$1 returning *`,
                    id,
                    state_id ? state_id : data.state_id,
                    condition ? condition : data.condition,
                    image_url ? image_url : data.image_url,
                    monthly_price ? monthly_price : data.monthly_price,
                    max_students ? max_students : data.max_students,
                    room_count ? room_count : data.room_count,
                    additional_info ? additional_info : data.room_count,
                    address ? address : data.address
                )

                res.status(200).send({ message: 'OK', data: readyData, status: 200 })
            }
            else {
                throw new Error('you are  not allowed')
            }
        }
        catch (error) {
            console.log(error.message)
            res.send(error.message)
        }

    },
    DELETE: async (req, res) => {
        try {
            const { id } = req.body
            const classified = await fetch(`select * from classified where classified_id=$1`, id)
            if (!classified) {
                throw new Error('no such classified')
            }
            if (classified.holder_id == req.headers.data.id)
                deletedClassified = await fetch(`delete from classified
                                                         where classified_id = $1 
                                                         returning *`,
                    id)
            else {
                throw new Error('you are not allowed')
            }

            console.log(deletedClassified)
            res.send('OK')
        }
        catch (error) {
            console.log(error.message)
            res.send({ message: error.message })
        }
    }
}
