const Location = require('../models/Location');

const reportLocation = async (req, res) => {
    const nurseId = req.nurse.nurseId;
    const { latitude, longitude, status } = req.body;

    try {
        // Validate status
        if (!Location.status_options.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const location = await Location.insert(nurseId, latitude, longitude, status);
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStatusOptions = async (req, res) => {
    res.status(200).json(Location.status_options);
};

module.exports = {
    reportLocation,
    getStatusOptions,
};
