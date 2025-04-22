const express = require('express');
const router = express.Router();
const { getScores } = require('../controllers/scoreController');

router.get('/', getScores);
module.exports = router;
