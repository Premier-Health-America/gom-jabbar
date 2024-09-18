const express = require('express');
const router = express.Router();
const { getFacilitiesList } = require('../controllers/facilityController');

router.get('/list', getFacilitiesList);

module.exports = router;
