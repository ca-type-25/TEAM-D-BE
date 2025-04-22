const express = require('express')
const { getTrips, getTripById, createTrip, updateTrip, deleteTrip, getMyTrips } = require('../controllers/tripController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/my-trips', getMyTrips)
router.get('/', getTrips)
router.get('/:id', getTripById)
router.post('/', createTrip)
router.put('/:id', updateTrip)
router.delete('/:id', deleteTrip)


module.exports = router