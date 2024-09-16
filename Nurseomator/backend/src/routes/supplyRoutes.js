const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    supplyRestock,
    supplyConsumption,
    getSupplyRequestOptions,
} = require('../controllers/supplyController');

router.post('/restock', authMiddleware, supplyRestock);
router.post('/consumption', authMiddleware, supplyConsumption);
router.get('/request-options', getSupplyRequestOptions);

module.exports = router;
