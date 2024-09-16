const PatientRecord = require('../models/PatientRecord');

const createPatientRecord = async (req, res) => {
    const nurseId = req.nurse.nurseId;
    const { patient_name, record } = req.body;

    try {
        const newRecord = await PatientRecord.create(nurseId, patient_name, record);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPatientRecordById = async (req, res) => {
    const { id } = req.params;

    try {
        const record = await PatientRecord.findById(id);

        if (!record) {
            return res.status(404).json({ message: 'Patient record not found' });
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePatientRecord = async (req, res) => {
    const { id } = req.params;
    const { patient_name, record } = req.body;

    try {
        const updatedRecord = await PatientRecord.update(id, patient_name, record);

        if (!updatedRecord) {
            return res.status(404).json({ message: 'Patient record not found' });
        }

        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePatientRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecord = await PatientRecord.delete(id);

        if (!deletedRecord) {
            return res.status(404).json({ message: 'Patient record not found' });
        }

        res.status(200).json({ message: 'Patient record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPatientRecord,
    getPatientRecordById,
    updatePatientRecord,
    deletePatientRecord,
};
