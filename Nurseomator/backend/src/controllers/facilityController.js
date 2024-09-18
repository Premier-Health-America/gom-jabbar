const Facility = require('../models/Facility');

const getFacilitiesList = async (req, res) => {
    try {
        const facilities = await Facility.getAll();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFacilitiesList,
};
