const Nurse = require('../models/Nurse');
const bcryptjs = require('bcryptjs');
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

        // Generate JWT token
        const token = jwt.sign({ nurseId: newNurse.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: 'Nurse registered successfully',
            nurse: newNurse,
            token,
        });
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
        const isMatch = await bcryptjs.compare(password, nurse.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ nurseId: nurse.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', nurse, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNurse = async (req, res) => {
    const { nurseId } = req.nurse;

    try {
        // Check if nurse exists
        const nurse = await Nurse.findNurseById(nurseId);
        if (!nurse) {
            return res.status(404).json({ message: 'Nurse not found' });
        }

        res.status(200).json({ message: 'Nurse retrieved successfully', nurse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNurse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNurse = await Nurse.delete(id);

        if (!deletedNurse) {
            return res.status(404).json({ message: 'Nurse not found' });
        }

        res.status(200).json({ message: 'Nurse deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerNurse,
    loginNurse,
    getNurse,
    deleteNurse,
};
