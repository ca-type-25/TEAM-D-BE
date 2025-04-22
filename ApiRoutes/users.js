const express = require('express')
const router = express.Router()
const {
  register,
  login,
  updateUser,
  getUserById,
  deleteUser
} = require('../controllers/userController')

const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', register)

router.post('/login', login)

router.put('/:id', authMiddleware, updateUser)

router.get('/:id', getUserById)

router.delete('/:id', authMiddleware, deleteUser)



module.exports = router
