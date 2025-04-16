const Trip = require('../models/tripModel')

async function getTrips(req, res) {
    try {
        const trips = await Trip.find()
        res.send(trips)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getTripById(req, res) {
    try {
        const { id } = req.params
        const trip = await Trip.findById(id)

        if (!trip) {
            return res.status(404).send({ error: 'Trip is not found!'})
        }
        res.send(trip)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function createTrip(req, res) {
    try {
        const trip = new Trip(req.body)
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

        res.send('Deleted Trip -', deletedTrip)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip
}