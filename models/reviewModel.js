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
        min: 1,
        max: 5
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Activities'
    }

},
{ timestamps: true }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review


