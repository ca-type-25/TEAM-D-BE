const express = require('express')
const { getTrips, getTripById, createTrip, updateTrip, deleteTrip, getMyTrips } = require('../controllers/tripController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/my-trips', authMiddleware, getMyTrips)
router.get('/', getTrips)
router.get('/:id', getTripById)
router.post('/', authMiddleware, createTrip)
router.put('/:id', authMiddleware, updateTrip)
router.delete('/:id', authMiddleware, deleteTrip)


module.exports = router