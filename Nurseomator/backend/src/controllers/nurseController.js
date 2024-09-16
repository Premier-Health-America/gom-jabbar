const Nurse = require('../models/Nurse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerNurse = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if nurse already exists
        const existingNurse = await Nurse.findNurseByUsername(username);
        if (existingNurse) {
            return res.status(400).json({ message: 'Nurse already exists' });
        }

        const newNurse = await Nurse.create(username, password);
        res.status(201).json({ message: 'Nurse registered successfully', nurse: newNurse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginNurse = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if nurse exists
        const nurse = await Nurse.findNurseByUsername(username);
        if (!nurse) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, nurse.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ nurseId: nurse.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerNurse,
    loginNurse,
};
