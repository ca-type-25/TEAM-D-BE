const Review = require('../models/reviewModel')

const createReview = async (req, res) => {
    try{ 
        console.log(req.body)
        const review = new Review(req.body)
        await review.save()

        res.send(review)
     } catch (error) {
        res.status(500).send(error)
     }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        res.send(reviews)

    } catch (error) {
        res.status(500).send(error)
    }
}

const getReviewsByID = async (req, res) => {
    try {
        const { id } = req.params
        const review = await Review.findById(id)

        if(!review) {
            return res.status(404).send({ error: 'Review was not found' })
        }

        res.send(review)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateReview = async (req, res) => {
    try {
        const { id } = req.params

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if(!updatedReview) {
            return res.status(404).send({ error: 'Group was not found' })
        }

        res.send(updatedReview)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params
        const deletedReview = await Review.findByIdAndDelete(id)

        if(!deletedReview){
            return res.status(404).send({ error: 'Review was not found. You may have already deleted it' })
        }

        res.send(deletedReview)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createReview,
    getReviews,
    getReviewsByID,
    updateReview,
    deleteReview
}