const Trip = require('../models/tripModel')
const Activity = require('../models/activityModel')

async function getTrips(req, res) {
    try {
        const trips = await Trip.find()
        .populate('user', 'name surname')
        .populate('destination', 'name')
            
        res.send(trips)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getTripById(req, res) {
    try {
        const { id } = req.params
        const trip = await Trip.findById(id)
        .populate('user', 'name surname')
        .populate('destination', 'name')

        if (!trip) {
            return res.status(404).send({ error: 'Trip is not found!'})
        }

        const activities = await Activity.find({
            destinationIds: { $in: trip.destination }
        })

        res.send( {trip, activities} )
    } catch (error) {
        res.status(500).send(error)
    }
}

async function createTrip(req, res) {
    try {
        
        const trip = new Trip({
            ...req.body,
            user: req.user.id
        })
        await trip.save()

        res.send(trip)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function updateTrip(req, res) {
    try {
        const { id } = req.params
        const updatedTrip = await Trip.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!updatedTrip) {
            return res.status(404).send({error: 'Trip is not found'})
        }

        res.send(updatedTrip)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteTrip(req, res) {
    try{
        const { id } = req.params
        const deletedTrip = await Trip.findByIdAndDelete(id)

        if (!deletedTrip) {
            return res.status(404).send({error: 'Trip is not found'})
        }

        res.status(200).send({
            message: 'Trip deleted successfully',
            trip: deletedTrip,
        })
    } catch (error) {
        res.status(500).send({
            error: 'Internal Server Error',
            details: error.message,
        })
    }
}

async function getMyTrips(req,res) {
    try{
        const trips = await Trip.find({user: req.user.id})
        .populate('destination')
        .populate('user', 'name')

        res.send(trips)
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    getTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
    getMyTrips
}