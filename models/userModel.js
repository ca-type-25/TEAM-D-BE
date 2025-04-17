const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Activities'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review


userId

activity