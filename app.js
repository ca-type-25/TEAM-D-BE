const express = require('express')
const process = require("process")
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./db')


app.use(express.json())
app.use(cors())

// ROUTES
const tripAPIRoutes = require('./ApiRoutes/trips')
const destinationAPIRoutes = require('./ApiRoutes/destinations')
const activitiesRouter = require('./ApiRoutes/activities')
const userRoutes = require('./ApiRoutes/users')
const reviewsAPIRoutes = require('./ApiRoutes/reviews')


app.use('/api/destinations', destinationAPIRoutes)
app.use('/api/trips', tripAPIRoutes)
app.use('/api/users', userRoutes)
app.use('/api/activities', activitiesRouter)
app.use('/api/reviews', reviewsAPIRoutes)

// const rolesMiddleware = require('./middlewares/rolesMiddleware')
// const ROLES = require('./config/roles')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
