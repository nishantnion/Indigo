const express = require('express');
const flightController = require('../controllers/flight.controller');

const router = express.Router();

router.get('/', flightController.getAllFlights);

module.exports = router;