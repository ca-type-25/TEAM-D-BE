const express = require('express')
require('dotenv').config()
const process = require('process')
require('./db')

const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())

const tripAPIRoutes = require('./ApiRoutes/trips')
app.use('/api/trips', tripAPIRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
