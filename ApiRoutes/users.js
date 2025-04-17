const express = require('express')
const router = express.Router()
const {
  register,
  login,
  updateUser
} = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', register)

router.post('/login', login)

router.put('/:id', authMiddleware, updateUser)

module.exports = router
