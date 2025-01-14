const express = require('express');
const { getWeather, getNearbyPlaces } = require('../controllers/weather');

const router = express.Router();

router.post('/weather', getWeather);
router.post('/places', getNearbyPlaces);

module.exports = router;
