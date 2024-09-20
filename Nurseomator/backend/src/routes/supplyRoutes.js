const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getMySupplies,
    supplyRestock,
    supplyConsumption,
    getSupplyRequestOptions,
    getMyHistory,
} = require('../controllers/supplyController');

router.get('/my-supplies', authMiddleware, getMySupplies);
router.post('/restock', authMiddleware, supplyRestock);
router.post('/consumption', authMiddleware, supplyConsumption);
router.get('/request-options', getSupplyRequestOptions);
router.get('/my-history', authMiddleware, getMyHistory);

module.exports = router;
