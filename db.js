const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 

mongoose.connect(process.env.DB_URI)

    .then(() => {
        console.log('Suup, Successfully connected to MongoDB:')
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB: :(', error)
    });

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB disconnected');
        process.exit(0);
    });
});
