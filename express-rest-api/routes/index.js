const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');

const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
