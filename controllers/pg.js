const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    password: 'jubajuba',
    database: 'accomodations',
    user: 'postgres'
})


const fetchall = async (SQL, ...params) => {

    try {
        client = await pool.connect()
        data = await client.query(SQL, params)
        return await data.rows
    }
    
    finally {
        client.release()
    }

}

const fetch = async (SQL, ...params) => {

    try {
        client = await pool.connect()
        data = await client.query(SQL, params)
        return await data.rows[0]
    }
    
    finally {
        client.release()
    }

}

    // ; (async () => {
    //     console.log(await fetchall(SQL, 'Qodirov'))
    //     console.log(await fetch(SQL,'Qodirov'))
    // })()

module.exports = {
    fetchall, 
    fetch
}
