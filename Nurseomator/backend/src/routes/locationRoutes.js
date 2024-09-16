const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { reportLocation, getStatusOptions } = require('../controllers/locationController');

router.post('/report', authMiddleware, reportLocation);
router.get('/status-options', getStatusOptions);

module.exports = router;
