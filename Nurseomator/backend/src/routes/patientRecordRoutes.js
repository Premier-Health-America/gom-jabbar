const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createPatientRecord,
    getPatientRecordById,
    updatePatientRecord,
    deletePatientRecord,
} = require('../controllers/patientRecordController');

router.post('/', authMiddleware, createPatientRecord);
router.get('/:id', authMiddleware, getPatientRecordById);
router.put('/:id', authMiddleware, updatePatientRecord);
router.delete('/:id', authMiddleware, deletePatientRecord);

module.exports = router;
