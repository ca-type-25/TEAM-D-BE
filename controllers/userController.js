const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const process = require('process');

const User = require("../models/userModel");

const register = async (req, res) => {
    const { username, email, password, name, surname, age, nationality } = req.body;

    if (!username || !email || !password || !name || !surname || !age || !nationality) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'Email already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name,
            surname,
            age,
            nationality
        });

        await newUser.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Invalid email or password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.send({ message: 'User Successfully Logged In', token });
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateUser = async (req, res) => {
    const { name, surname, age, nationality } = req.body;
    const { id } = req.user;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, surname, age, nationality },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User does not exist' });
        }

        res.send({ message: 'User Successfully Updated', user: updatedUser });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    register,
    login,
    updateUser
};
