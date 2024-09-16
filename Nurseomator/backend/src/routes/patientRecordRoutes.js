const express = require('express');
const router = express.Router();
const {
    createPatientRecord,
    getPatientRecordById,
    updatePatientRecord,
    deletePatientRecord,
} = require('../controllers/patientRecordController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createPatientRecord);
router.get('/:id', authMiddleware, getPatientRecordById);
router.put('/:id', authMiddleware, updatePatientRecord);
router.delete('/:id', authMiddleware, deletePatientRecord);

module.exports = router;
