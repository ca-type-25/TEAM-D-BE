const mongoose = require('mongoose')
const process = require('process')

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Suup, Successfully connected to MongoDB:')
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB: :(', error)
    })

// cia tam kad kai sustabdom serveri kad ir connection nusikillintu
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB disconnected')
        process.exit(0)
    })
})