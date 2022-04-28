require("dotenv").config()
const mysql = require("mysql")


const database = mysql.createPool({
     connectionLimit: 100,
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
     port: process.env.DB_PORT
});

database.getConnection(async (err, connection) => {
     if (err) throw (err)
     const data = "DELETE FROM sessiontable WHERE sessionNum"
     const insert_query = mysql.format(data)
     await connection.query(insert_query, async (err, result) => {
          connection.release()
          if (err) throw (err)
     })
})
process.exit()