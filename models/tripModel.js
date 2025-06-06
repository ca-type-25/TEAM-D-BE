const mongoose = require('mongoose')

const tripsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        trim: true,
        required: true
        
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    destination: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Destination',
        trim: true
    },
}, { timestamps: true })

const Trip = mongoose.model('Trip', tripsSchema)

module.exports = Trip