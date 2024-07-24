
const express = require('express');
const router = express.Router();
const alertController = require('../controller/alertController');

router.post('/create', alertController.createAlert);
router.get('/', alertController.getAllAlerts);
router.get('/del/:alertId', alertController.deactivateAlert);

module.exports = router;
