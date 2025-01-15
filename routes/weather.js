const express = require('express');
const { getWeather, getNearbyPlaces, addFavorite, getFavorites } = require('../controllers/weather');

const router = express.Router();

router.post('/weather', getWeather);
router.post('/places', getNearbyPlaces);
router.post('/favorites', addFavorite); 
router.get('/favorites', getFavorites);

module.exports = router;
