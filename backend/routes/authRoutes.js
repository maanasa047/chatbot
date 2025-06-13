// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// ✅ Destructured import from the controller
const { signup, login } = require('../controllers/authControllers');

// ✅ Using imported functions correctly
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
