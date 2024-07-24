
const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherController');

router.get('/', weatherController.getCurrentWeather);
router.get('report/:date/:city', weatherController.getDailySummary);
// router.get('/report/:city', weatherController.getDailyReport);

module.exports = router;
