
require("dotenv").config()
//Express Server
const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const https = require('https')
const mysql = require("mysql")
const crypto = require("crypto")

const database = mysql.createPool({
     connectionLimit: 100,
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
     port: process.env.DB_PORT
});

//Express Static
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json());

app.get('/', (req, res) => {
     res.sendFile(__dirname + '/public/index.html')
})

//Express Listen
app.listen(port, () => {
     console.log(`Neardle running on http://localhost:${port}`)
})


app.post("/saveWords", async (req, res) => {
     const word1 = req.body.word1
     const word2 = req.body.word2
     const word3 = req.body.word3
     const word4 = req.body.word4
     const word5 = req.body.word5
     const word6 = req.body.word6
     const sessionId = req.body.sessionId
     database.getConnection(async (err, connection) => {
          if (err) throw (err)
          const data = "UPDATE sessiontable SET word1 = ?, word2 = ?, word3 = ?, word4 = ?, word5 = ?, word6 = ? WHERE sessionId = ?"
          const insert_query = mysql.format(data, [word1, word2, word3, word4, word5, word6, sessionId])
          await connection.query(insert_query, async (err, result) => {
               connection.release()
               if (err) throw (err)
          })
     })
});

app.post("/createSession", async (req, res) => {
     const sessionId = crypto.randomBytes(20).toString("hex")
     database.getConnection(async (err, connection) => {
          if (err) throw (err)
          const data = "INSERT INTO sessiontable VALUES (0, ?, ?, ?, ?, ?, ?, ?)"
          const insert_query = mysql.format(data, [sessionId, null, null, null, null, null, null])
          await connection.query(insert_query, async (err, result) => {
               connection.release()
               if (err) throw (err)
               res.cookie("sessionId", sessionId, { maxAge: 86400000, overwrite: true }).send()
          })
     })
});

app.get("/getWords", async (req, res) => {
     const sessionId = req.cookies.sessionId
     database.getConnection(async (err, connection) => {
          if (err) throw (err)
          const data = "SELECT * FROM sessiontable WHERE sessionId = ?"
          const insert_query = mysql.format(data, [sessionId])
          await connection.query(insert_query, async (err, result) => {
               if (result.length > 0) {
                    connection.release()
                    if (err) throw (err)
                    res.json({ word1: result[0].word1, word2: result[0].word2, word3: result[0].word3, word4: result[0].word4, word5: result[0].word5, word6: result[0].word6 })
               }
          })
     })
})

app.get("/validateSession", async (req, res) => {
     const sessionId = req.cookies.sessionId
     database.getConnection(async (err, connection) => {
          if (err) throw (err)
          const data = "SELECT * FROM sessiontable WHERE sessionId = ?"
          const insert_query = mysql.format(data, [sessionId])
          await connection.query(insert_query, async (err, result) => {
               connection.release()
               if (err) throw (err)
               res.json({ sessionValid: result.length > 0 })
          })
     })
})