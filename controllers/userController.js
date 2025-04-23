const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const register = async (req, res) => {
  const { name, surname, age, nationality, email, password, role } = req.body

  if (!name || !surname || !age || !nationality || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      surname,
      age,
      nationality,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' })

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )
      
      res.json({ 
        message: 'Logged in successfully', 
        token,
        id: user._id
      })
     } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message })
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, age, nationality } = req.body

  try {
    const updated = await User.findByIdAndUpdate(
      id,
      { name, surname, age, nationality },
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User updated successfully', user: updated })
  } catch (error) {
    res.status(500).json({ error: 'Update failed', details: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await User.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Delete failed', details: error.message })
  }
}



module.exports = {
  register,
  login,
  updateUser,
  getUserById,
  deleteUser
}
