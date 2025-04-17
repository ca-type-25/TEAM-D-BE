const express = require('express')
const { createReview, getReviews, getReviewsByID, updateReview, deleteReview } = require('../controllers/reviewController')

const router = express.Router()

router.get('/', getReviews)
router.get('/:id', getReviewsByID)
router.post('/', createReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)


module.exports = router