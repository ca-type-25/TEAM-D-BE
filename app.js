const userRoutes = require('./ApiRoutes/users')

console.log('veikia....')

const express = require('express')
require('dotenv').config()
const process = require('process')
require('./db')

const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
