const mongoose = require('mongoose')
const Activity = require('../models/activityModel')


const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find() 
        res.send(activities)

    } catch (error) {
        res.status(500).send(error)
    }
}

const getActivityId = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid activity ID' })
      }
  
  
      const activity = await Activity.findById(id)
  
      if (activity.length === 0) {
        return res.status(404).send({ error: 'Activity not found' })
      }
  
      res.send(activity)
    } catch (error) {
      res.status(500).send(error)
    }
}
  
const createActivity = async (req, res) => {
try {
    const activity = new Activity(req.body)
    await activity.save()

    res.send(activity)
} catch (error) {
    res.status(500).send(error)
}
}
  
const updateActivity = async (req, res) => {
try {
    const { id } = req.params
    const updatedActivity = await Activity.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true } 
    )

    if (!updatedActivity) {
    return res.status(404).send({ error: 'Activity not found' })
    }

    res.send(updatedActivity)
} catch (error) {
    if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
    }
    res.status(500).send(error)
}
}
  
const removeActivity = async (req, res) => {
try {
    const { id } = req.params
    const deletedActivity = await Activity.findByIdAndDelete(id)

    if (!deletedActivity) {
    return res.status(404).send({ error: 'Activity not found' })
    }

    res.send(deletedActivity)
} catch (error) {
    res.status(500).send(error)
}
}

module.exports = {
    getActivities,
    getActivityId,
    createActivity,
    updateActivity,
    removeActivity
}