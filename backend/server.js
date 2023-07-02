const express = require('express')
const conn = require('./db')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
conn()

app.use('/user', require('./routes/userRoutes'))
app.use('/note', require('./routes/noteRoutes'))

app.listen(process.env.PORT, ()=>console.log(`listening on ${process.env.PORT}`))

app.get('/foo', (req, res) => {
  res.send('bar')
})