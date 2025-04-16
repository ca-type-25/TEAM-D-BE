
const express = require('express')
require('dotenv').config()
require('./db')

const process = require('process')

const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


const activitiesRouter = require('./ApiRoutes/activities')
const countriesRouter = require('./ApiRoutes/countries')



app.use('/api/activities', activitiesRouter)
app.use('/api/countries', countriesRouter)




const tripAPIRoutes = require('./ApiRoutes/trips')
app.use('/api/trips', tripAPIRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
