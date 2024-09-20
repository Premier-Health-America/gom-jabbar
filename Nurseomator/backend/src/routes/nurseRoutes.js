const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    registerNurse,
    loginNurse,
    getNurse,
    deleteNurse,
} = require('../controllers/nurseController');

router.post('/register', registerNurse);
router.post('/login', loginNurse);
router.get('/', authMiddleware, getNurse);
router.delete('/:id', authMiddleware, deleteNurse);

module.exports = router;
