const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { registerNurse, loginNurse, deleteNurse } = require('../controllers/nurseController');

router.post('/register', registerNurse);
router.post('/login', loginNurse);
router.delete('/:id', authMiddleware, deleteNurse);

module.exports = router;
