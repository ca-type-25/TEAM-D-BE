const express = require('express')
const { getActivities, getActivityId, createActivity, removeActivity, updateActivity } = require('../controllers/activityController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getActivities)
router.get('/:id', getActivityId)
router.post('/', authMiddleware, createActivity)
router.put('/:id', authMiddleware, updateActivity)
router.delete('/:id', authMiddleware, removeActivity)


module.exports = router